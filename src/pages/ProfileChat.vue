<template>
<q-page class="column justify-center align-center wrap " style="flex-wrap: wrap">
  <div style="max-height: 50vh; overflow-y: auto; width: max(50vw, 350px)" class="custom-scroll bg-secondary-color border-white border-radius-12 q-pa-lg" id="chat">

    <q-chat-message
      style="margin-bottom: 1rem"
      :sent="msg.user.guid===user.guid"
      v-for="msg in messages" v-bind="msg"
      :name="msg.user.username"
      :avatar="msg.user.url_image"
      :stamp="msg.creation_date"
      :text="[msg.content]"
      :bg-color="msg.user.guid===user.guid ? 'primary' : 'white'"
    >

    </q-chat-message>

  </div>
  <div class="flex justify-between q-pa-sm align-center " style="min-width: 340px; width: 50vw; ">
    <q-input type="textarea" outlined label-color="white" input-class="text-white" label="Введите сообщение" style="flex-grow: 1" v-model="msg"></q-input>
    <q-btn icon="send" :disable="msg.length<1" round flat @click="send" style="height: fit-content; width: fit-content"></q-btn>
  </div>


</q-page>
</template>

<script>
import ChatService from "src/services/chat.service";
import {useAuthStore} from "stores/auth-store";
import {computed} from "vue";
import {socket} from "src/socket";
import {useSizeStore} from "stores/size-store";

export default {
  name: "ProfileChat",
  components:{

  },
  data(){
    return {
      messages: [],
      authStore: useAuthStore(),
      user: computed(()=>{return this.authStore.$state.user}),
      msg: "",
      widthStore: useSizeStore(),
      width: computed(() => { return this.widthStore.$state.width}),
      inputWidth: 100
    }
  },
  mounted(){

    socket.on("new_msg_front", (data)=>{
      this.messages.push(data)
      if(!this.imageExists(data.user.url_image)){
        data.user.url_image="https://static.tildacdn.com/tild6338-3666-4133-a633-643664333838/photo.jpg"
      }
      if(this.user.guid === data.user.guid) {

        let el = document.getElementById("chat")

        this.$nextTick(()=>{
          el.scrollTop = el.scrollHeight
        })

      }
    })


    ChatService.getMessages().then(res=>{
      let msgs = res.data
      msgs.forEach(obj=>{
        if(!this.imageExists(obj.user.url_image)){
          obj.user.url_image = "https://static.tildacdn.com/tild6338-3666-4133-a633-643664333838/photo.jpg"
        }
      })
      this.messages=msgs
      let el = document.getElementById("chat")
      setTimeout(()=>{
        el.scrollTop=el.scrollHeight
        let el2 = document.getElementById("chat-input")
        this.inputWidth=el2.style.width
      }, 500)

    })
  },
  methods: {
    imageExists(image_url){
      var http = new XMLHttpRequest();
      http.open('HEAD', image_url, false);
      http.send();
      return http.status !== 404;
    },
    send(){
      socket.emit("message", {content: this.msg, token: localStorage.getItem("access_token")})
      this.msg=""
    },

    },
    computed: {
    mapMessages(){
      return this.messages.map(x=>{
        return {

            _id: x.id,
            content: x.content,
            senderId: x.user.user_id,
            username: x.user.username,
            timestamp: x.created_at,
            saved: true,
        }
      })
      }
    }
}
</script>

<style>
.item-chat{
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0;
  text-align: center;
  border: 1px solid black;
}
</style>
