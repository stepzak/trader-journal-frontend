<template>
  <q-page class="flex align-center justify-center" style="height: 100vh">
    <q-card bordered class="q-pa-lg bg-card margin-navbar" style="border-radius: 12px; max-width: 90%">
      <q-form @submit.prevent="register">
        <h2>Регистрация</h2>
        <q-input outlined label-color="white" input-class="text-white" label="Имя пользователя" v-model="username" :rules="[value => {return (value && value.length>0) || 'Поле логин должно быть заполено'}]"/>
        <q-input outlined label-color="white" input-class="text-white" label="Email" v-model="email" :rules="[value => {return (value && value.length>0) || 'Поле email должно быть заполено'}]"/>
        <q-input label-color="white" outlined :type="showPass ? 'text' : 'password'" input-class="text-white" label="Пароль" v-model="password" :rules="[value => {return (value && value.length>0) || 'Поле пароль должно быть заполено'}]">
          <template #append>
            <q-icon color = "white" :name="showPass ? 'visibility' : 'visibility_off'" @click="showPass = !showPass"></q-icon>
          </template>
        </q-input>
        <q-btn class="hoverable-primary q-mt-lg w-100" color="primary" @click="register" text-color="black">Создать аккаунт</q-btn>
      </q-form>
    </q-card>
  </q-page>
</template>

<script>
import AuthService from "src/services/auth.service";
import {useAuthStore} from "stores/auth-store";
import {computed} from "vue";

export default {
  name: "Register",
  data(){
    return {
      showPass: false,
      username: null,
      password: null,
      email: null,
      authStore: useAuthStore(),
      user: computed(()=>{return this.authStore.$state.user})
    }
  },
  mounted(){
    console.log(this.authStore.$state.user)
    if(this.user){
      this.$q.notify({color: "green", message: "Успешно"})
      setTimeout(()=>{
        this.$router.push("/login")
      }, 500)
    }
  },
  methods:{
    register(){

      AuthService.register({username: this.username, email: this.email, password: this.password}).then(res=>{
        if(!res.data.status_code){
          this.$q.notify({color: "success", message: "Успешно"})
          setTimeout(()=>{
            this.$router.push("/login")
          }, 500)
        }
        else{
          this.$q.notify({color: "red-3", message: res.data.message})
        }
      }).catch(e=>{
        this.$q.notify({color: "red-3", message: e.response.data.detail})

      })
    }
  }
}
</script>

<style scoped>

</style>
