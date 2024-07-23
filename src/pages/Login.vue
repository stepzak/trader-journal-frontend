<template>
<q-page class="flex align-center justify-center">
  <q-card bordered class="q-pa-lg bg-card margin-navbar" style="border-radius: 12px; max-width: 90%">
    <q-card-section class="flex justify-between align-center" style="gap: 1rem">
      <div class="text-h4">ВОЙТИ</div>
      <p style="margin: 0">
        Нет аккаунта?
      <span class="cursor-pointer text-primary" @click="$router.push('/register')">
        Создать бесплатно
      </span>
      </p>
    </q-card-section>
    <q-form @submit.prevent="login">
        <q-input outlined label-color="white" input-class="text-white" label="Логин или email" v-model="username" :rules="[value => {return (value && value.length>0) || 'Поле логин должно быть заполено'}]"/>
      <q-input label-color="white" outlined :type="showPass ? 'text' : 'password'" input-class="text-white" label="Пароль" v-model="password" class="q-mt-lg" :rules="[value => {return (value && value.length>0) || 'Поле пароль должно быть заполено'}]">
        <template #append>
          <q-icon color = "white" :name="showPass ? 'visibility' : 'visibility_off'" @click="showPass = !showPass"></q-icon>
        </template>
      </q-input>
      <span class="cursor-pointer text-primary q-mt-lg" @click="$router.push('/forgot-password')">
        Забыли пароль?
      </span>
      <q-btn class="hoverable-primary q-mt-lg w-100" color="primary" @click="login" text-color="black">Войти</q-btn>
    </q-form>
  </q-card>
</q-page>
</template>

<script>
import AuthService from "src/services/auth.service";
import {useAuthStore} from "stores/auth-store";
import {computed} from "vue";

export default {
  name: "Login",
  data(){
    return {
      showPass: false,
      username: null,
      password: null,
      authStore: useAuthStore(),
      user: computed(()=>{return this.authStore.$state.user})
    }
  },
  mounted(){
    console.log(this.authStore.$state.user)
    if(this.user){
      this.$q.notify({color: "positive", message: "Успешный вход"})
      setTimeout(()=>{
        this.$router.push("/profile")
      }, 500)
    }
  },
  methods:{
    login(){
      let formData = new FormData()
      formData.append("username", this.username)
      formData.append("password", this.password)

      AuthService.login(formData).then(res=>{
        if(res.data.access_token){
          localStorage.setItem("access_token", res.data.access_token)
          localStorage.setItem("refresh_token", res.data.refresh_token)
          AuthService.getUser().then(res1=>{
            this.authStore.setUser(res1.data)
            this.$q.notify({color: "positive", message: "Успешный вход"})
            setTimeout(()=>{
              this.$router.push("/profile")
            }, 500)
          })
        }
        else{
          this.$q.notify({color: "negative", message: res.data.message})
        }
      }).catch(e=>{
        this.$q.notify({color: "negative", message: e.response.data.detail})
      })
    }
  }
}
</script>

<style scoped>

</style>
