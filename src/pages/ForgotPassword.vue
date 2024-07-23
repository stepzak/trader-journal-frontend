<template>
<q-page class="flex align-center justify-center">
  <q-card bordered class="q-pa-lg bg-card margin-navbar" style="border-radius: 12px; max-width: 90%">
    <q-card-section class="flex justify-between align-center" style="gap: 1rem">
      <div class="text-h4">СБРОСИТЬ ПАРОЛЬ</div>
      <p style="margin: 0">
        Нет аккаунта?
        <span class="cursor-pointer text-primary" @click="$router.push('/register')">
        Создать бесплатно
      </span>
      </p>
    </q-card-section>
    <q-form v-if="stage===0" @submit.prevent="sendCode">
      <q-input label-color="white" input-class="text-white" outlined v-model="email" label="Email" :rules="[val=>{return (val && val.length>0) || 'Поле должно быть заполнено'}]">

      </q-input>
      <q-btn  @click="sendCode" color="primary" text-color="black" class="hoverable-primary q-mt-lg" label="Отправить"></q-btn>
    </q-form>
    <q-form v-else-if="stage===1" @submit.prevent="checkCode">
      <q-input label-color="white" input-class="text-white" outlined v-model="code" label="Код с почты" :rules="[val=>{ return (val && val.length>0) || 'Поле должно быть заполнено'}]">
      </q-input>
      <q-btn color="primary" text-color="black" class="hoverable-primary q-mt-lg" label="Отправить"  @click="checkCode"></q-btn>
    </q-form>
    <q-form v-else @submit.prevent="changePass">
      <q-input label-color="white" outlined :type="showPass ? 'text' : 'password'" input-class="text-white" label="Новый пароль" v-model="new_pass" class="q-mt-lg" :rules="[value => {return (value && value.length>0) || 'Поле пароль должно быть заполено'}]">
        <template #append>
          <q-icon color = "white" :name="showPass ? 'visibility' : 'visibility_off'" @click="showPass = !showPass"></q-icon>
        </template>
      </q-input>
      <q-input label-color="white" v-model="confirm" outlined :type="showConfirm ? 'text' : 'password'" input-class="text-white" label="Подтвердите пароль"  class="q-mt-lg" :rules="[value => {return (value && value===new_pass) || 'Подтверждение пароля не совпадает с паролем'}]">
        <template #append>
          <q-icon color = "white" :name="showConfirm ? 'visibility' : 'visibility_off'" @click="showConfirm = !showConfirm"></q-icon>
        </template>
      </q-input>
      <q-btn color="primary" text-color="black" class="hoverable-primary q-mt-lg" label="Отправить" @click="changePass"></q-btn>
    </q-form>
  </q-card>
</q-page>
</template>

<script>
import AuthService from "src/services/auth.service";

export default {
  name: "ForgotPassword",
  data(){
    return {
      email: "",
      stage: 0,
      code: "",
      factor: "",
      new_pass: "",
      showPass: false,
      showConfirm: false,
      confirm: ""
    }
  },
  methods:{
    sendCode(){
      return AuthService.resetPassword(this.email).then(res=>{
        if(!res.data.exception){
          this.stage++
        }
        else{
          this.$q.notify({color: "negative", message: res.data.message})
        }
      })
    },
    checkCode(){
      return AuthService.checkCode(this.email, this.code).then(res=>{
        if(!res.data.exception){
          this.stage++
          this.factor=res.data.factor
        }
        else{
          this.$q.notify({color: "negative", message: res.data.message})
        }
      }).catch(e=>{
        this.$q.notify({color: "negative", message: e.response.data.detail})
      })
    },
    changePass(){
      return AuthService.changePassword(this.factor, this.new_pass).then(res=>{
        if(!res.data.exception){
          this.$router.push("/login")
          this.$q.notify({color: "positive", message: "Успешно"})
        }
        else{
          this.$q.notify({color: "negative", message: res.data.message})
        }
      }).catch(e=>{
        console.log(e)
        this.$q.notify({color: "negative", message: e.response.data.detail})
      })
    },
  }
}
</script>

<style scoped>

</style>
