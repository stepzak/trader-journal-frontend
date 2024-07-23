<template>
  <q-layout view="hHh lpR lff" style="background: var(--background-main)">
    <transition
      appear
      enter-active-class="animated bounceInDown slower"
      leave-active-class="animated bounceOutUp"
      :duration="3000"

    >
    <q-header id="pc-navbar" elevated style="backdrop-filter: blur(5px); -webkit-backdrop-filter: blur(5px); position: absolute; background: transparent; border-bottom: 0 solid gray; z-index: 1000;" key="test" v-show="true">
      <q-toolbar id="pc-navbar-top" style="font-size: large; padding-right: 2rem; z-index: 5000" key="toolbar">
        <q-btn
          flat
          dense
          round
          :icon="leftDrawerOpen ?'menu' :'menu'"
          aria-label="Menu"
          @click="toggleLeftDrawer"
          id="drawer-mobile"
          v-if="windowWidth<=1400"
          class="q-ml-auto"
          size="lg"
        />
        <q-toolbar-title style="width: fit-content; align-items: center" class="flex" key="1" v-if="windowWidth>1400">
          <q-item clickable @click="$router.push('/home')" style="margin-right: 10%" key =2>
          <q-icon name="home" size="xx-large" key = 3></q-icon>
          </q-item>
          <q-item style="padding: 1.7rem" to="/home" active-class="border-bottom-active" key="4" class="q-ml-auto">
            Главная
          </q-item>
          <q-item style="padding: 1.7rem" to="/analytics" active-class="border-bottom-active" key="4">
            Аналитика
          </q-item>
          <q-item style="padding: 1.7rem" to="/reviews" active-class="border-bottom-active" key="4">
            Отзывы
          </q-item>
          <q-item style="padding: 1.7rem" to="/faq" active-class="border-bottom-active" key="4">
            FAQ
          </q-item>
          <q-item style="padding: 1.7rem" to="/blog" active-class="border-bottom-active" key="4">
            Блог
          </q-item>
          <q-item style="padding: 1.7rem; margin-right: 2rem" to="/top" active-class="border-bottom-active" key="4">
            Топ
          </q-item>
          <q-separator style="margin-right: 2rem"></q-separator>
          <div class="flex align-center justify-between q-ml-auto reverse"  v-if="!user" style="min-width: 310px">
            <q-btn color="primary" size="large" class="q-ml-auto hoverable-primary" id="321" @click="$router.push('/register')"><div style="color: black">Регистрация</div></q-btn>
            <q-btn color="primary" size="large" class="q-ml-auto hoverable-primary" id="321" @click="$router.push('/login')"><div style="color: black">Войти</div></q-btn>
          </div>
          <div class="flex align-center justify-between q-ml-auto reverse"  v-else style="min-width: 350px; gap: 1.2rem">
            <q-item  @click="$router.push('/profile')" clickable class="align-center q-ml-auto">
            <q-item-section avatar style="padding-right: 0; min-width: 30px">
              <q-icon name = "person"></q-icon>
            </q-item-section>
            <div>{{user.username}}</div>
            </q-item>
            <q-btn color="primary" size="large" class="hoverable-primary" id="321" @click="logOut"><div style="color: black">Выйти</div></q-btn>
          </div>
        </q-toolbar-title>
        <q-toolbar-title v-else class="flex q-pa-sm" >
          <q-item style="width: fit-content" clickable to="/" active-class="">Дневник трейдера</q-item>
          <div class="flex align-center justify-between q-ml-auto reverse"  v-if="!user && windowWidth >=800" style="min-width: 310px">
            <q-btn color="primary" size="large" class="q-ml-auto hoverable-primary" id="321" @click="$router.push('/register')"><div style="color: black">Регистрация</div></q-btn>
            <q-btn color="primary" size="large" class="q-ml-auto hoverable-primary" id="321" @click="$router.push('/login')"><div style="color: black">Войти</div></q-btn>

          </div>
          <div v-else-if="user && windowWidth >= 800" style="min-width: 310px" class="flex align-center justify-between q-ml-auto reverse">
            <q-item  @click="$router.push('/profile')" clickable class="align-center">
              <q-item-section avatar style="padding-right: 0; min-width: 30px">
                <q-icon name = "person"></q-icon>
              </q-item-section>
              <div>{{user.username}}</div>
            </q-item>
            <q-btn color="primary" size="large" class="hoverable-primary" id="321" @click="logOut"><div style="color: black">Выйти</div></q-btn>
          </div>
        </q-toolbar-title>


      </q-toolbar>
    </q-header>
    </transition>
    <q-footer  v-if="!$route.path.includes('home') && !$route.path.includes('profile')">
      <div style="background-color: #1c2236; padding: 5rem 2rem 5rem 2rem; scroll-snap-align: end; min-height: 50vh" >
        <div class="flex" style="gap: 1rem">
          <div class="text-h6" style="color: white">МЕНЮ</div>
        </div>
        <div style="font-size: small; color: silver; text-align: center; margin-top: 3rem">Информация, предоставленная на этом веб-сайте, предназначена только для информационных и образовательных целей. Веб-сайт не держит или не оперирует активами пользователей и не предоставляет инвестиционные, финансовые, правовые, налоговые или другие советы. Любой анализ или визуальное представление финансовых данных предназначено для общей информации и не должно служить основанием для принятия инвестиционных решений. Пользователи всегда должны проводить свои собственные исследования и принимать собственные решения.</div>
      </div>
    </q-footer>
    <q-drawer id = "drawer-mobile"

      v-model="leftDrawerOpen"
              v-if="windowWidth<=1400"

              style="background-color: var(--background-main); border-right: 1px solid black"
              class="column justify-between q-pa-sm"
    >
      <q-list class="q-mt-sm">

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />

      </q-list>
      <div class="flex justify-center">
        <div v-if="windowWidth<800 && !user" class="flex align-center" style="gap: 1rem">
          <q-btn color="primary" size="large" class="q-ml-auto hoverable-primary" id="321" @click="$router.push('/register')"><div style="color: black">Регистрация</div></q-btn>
          <q-btn color="primary" :outline="outline" size="large" class="q-mt-auto hoverable-primary " style="width: fit-content" ><div :style="!outline ?  'color: black' : 'color: white'" @click="$router.push('/login')" >Войти</div></q-btn>
        </div>
        <div v-else-if="user && windowWidth<800" class="flex align-center" style="gap: 1rem">
          <q-item  @click="$router.push('/profile')" clickable class="align-center">
            <q-item-section avatar style="padding-right: 0; min-width: 30px">
              <q-icon name = "person"></q-icon>
            </q-item-section>
            <div>{{user.username}}</div>
          </q-item>
          <q-btn color="primary" size="large" class="hoverable-primary" id="321" @click="logOut"><div style="color: black">Выйти</div></q-btn>
        </div>


      </div>
    </q-drawer>

    <q-page-container style="padding-top: 0!important; min-height: 100vh">
      <router-view style="min-height: 100vh"/>

    </q-page-container>


  </q-layout>
</template>

<script>
import {computed, defineComponent, ref} from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import {useSizeStore} from "stores/size-store";
import {useAuthStore} from "stores/auth-store";
import {api} from "boot/axios";
import AuthService from "src/services/auth.service";

const linksList = [
  {
    title: 'Главная',
    caption: 'Домашняя страница',
    icon: 'home',
    link: '/'
  },
  {
    title: 'Аналитика',
    caption: 'Анализ портфеля',
    icon: 'trending_up',
    link: '/analytics'
  },
  {
    title: 'Отзывы',
    caption: 'Страница с отзывами',
    icon: 'chat',
    link: '/reviews'
  },
  {
    title: 'FAQ',
    caption: 'Частые вопросы и ответы',
    icon: 'question_answer',
    link: '/faq'
  },
  {
    title: 'Блог',
    caption: 'Блог',
    icon: 'rss_feed',
    link: '/blog'
  },
  {
    title: 'Топ',
    caption: '',
    icon: 'leaderboard',
    link: '/top'
  }
]

export default defineComponent({
  name: 'MainLayout',
  watch:{
    $route(to, from){
      if(to.path==="/"){
        this.$router.push("/home")
      }
    }
  },
  setup () {
    const leftDrawerOpen = ref(false)
    const sizeStore = useSizeStore();
    const authStore = useAuthStore();
    return {
      linksList,
      leftDrawerOpen,
      windowWidth: computed(()=>sizeStore.$state.width),
      user: computed(()=>authStore.$state.user),
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      sizeStore,
      authStore
    }
  },

  components: {
    EssentialLink
  },
  data(){
    return{
        outline: false
    }
  },
  mounted(){

    if(localStorage.getItem("access_token")){
      AuthService.getUser().then(res=>{
        this.authStore.setUser(res.data)
      }).catch(e=>{
        this.logOut()
      })
    }

    if(this.$route.path==='/'){
      this.$router.push("/home")
    }
    this.sizeStore.setWidth(window.innerWidth)
    let sizeStore = this.sizeStore
    this.$nextTick(()=>{
      let m = document.getElementById("pc-navbar").clientHeight
      console.log((m+1).toString()+"px")
      document.body.style.setProperty("--scroll-margin", (m+2).toString()+"px")
      console.log(document.body.style.cssText)
    })
    window.addEventListener("resize", function read_e(e){
      sizeStore.setWidth(window.innerWidth)
      let m = document.getElementById("pc-navbar").clientHeight
      console.log(m)
      console.log((m+1).toString()+"px")
      document.body.style.setProperty("--scroll-margin", (m+2).toString()+"px")
      console.log(document.body.style.cssText)
    })
  },
  methods:{
    logOut(){
      localStorage.removeItem("access_token")
      this.authStore.setUser(null)
      this.$router.push("/login")
    }
  }


})
</script>

<style>
.router-link-active{
  color: var(--q-primary)!important;
}
.router-link{
  color: white
}

main::-webkit-scrollbar {
  width: 12px;
}
main::-webkit-scrollbar-track {
  background: transparent;
}
main::-webkit-scrollbar-thumb {
  background-color: #212431;
  border-radius: 20px;
  border: 1px solid lightgray;
  z-index: 999
}

.border-bottom-active{
  border-bottom: 3px solid var(--q-primary);
  color: var(--q-primary);
  .q-focus-helper{
    padding: 1px 1px
  }

}

.hoverable-primary:hover{
  transition: box-shadow .5s;

  background-color: var(--q-secondary)!important;
  box-shadow: 10px 5px 5px var(--q-secondary)!important;
}

.margin-navbar{
  margin-top: var(--scroll-margin)
}

.hoverable-primary{
  transition: box-shadow .5s;

}

.bg-secondary-color{
  background-color: #31384d;
}

.bg-card{
  background: rgb(30 41 59)!important;
}

.q-field--outlined .q-field__control:before{
  border: 2px solid #2c3449;
}

.q-field--outlined .q-field__control:after{
}

.q-field__control-container{
  border-color: lightgray!important;
}

.border-radius-12{
  border-radius: 12px!important;
}

.border-white{
  border: 1px solid white
}

.text-lg{
  font-size: large;
}


</style>
