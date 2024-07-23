<template>
  <q-layout view="hHh lpR fFf">

    <q-drawer v-model="leftDrawerOpen" side="left" overlay  v-if="windowWidth>1400"  style="background-color: var(--background-main); border-right: 1px solid black"
              class="column q-pa-sm">
      <EssentialLink
        v-for="link in linksList"
        :key="link.title"
        v-bind="link"
      />
    </q-drawer>

    <q-drawer show-if-above v-model="rightDrawerOpen" side="right"  v-else  style="background-color: var(--background-main); border-right: 1px solid black"
              class="column q-pa-sm">
      <EssentialLink
        v-for="link in linksList"
        :key="link.title"
        v-bind="link"
      />
    </q-drawer>



    <q-footer id="profile-navbar" reveal class="text-white position-absolute" style="backdrop-filter: blur(5px); -webkit-backdrop-filter: blur(5px); position: absolute; background: transparent; border-bottom: 0 solid gray; z-index: 1000;">
      <q-toolbar style="backdrop-filter: blur(5px); -webkit-backdrop-filter: blur(5px); background: transparent; border-bottom: 0 solid gray; z-index: 1000;">
        <q-toolbar-title style="backdrop-filter: blur(5px); -webkit-backdrop-filter: blur(5px); background: transparent; border-bottom: 0 solid gray; z-index: 1000;">
          <q-btn
            flat
            dense
            round
            :icon="leftDrawerOpen ?'menu' :'menu'"
            aria-label="Menu"
            @click="toggleLeftDrawer"
            id="drawer-pc-profile"
            v-if="windowWidth>1400"
            class=""
            size="lg"
          />
          <q-btn
            flat
            dense
            round
            :icon="rightDrawerOpen ?'menu' :'menu'"
            aria-label="Menu"
            @click="toggleRightDrawer"
            id="drawer-mobile-profile"
            v-if="windowWidth<=1400"
            class="q-ml-auto"
            size="lg"
          />
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
    <q-page-container style="max-height: 100vh; overflow-y: auto; margin-bottom: calc(var(--footer-height)+ 10px);">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import {computed, ref} from 'vue'
import {useSizeStore} from "stores/size-store";
import {useAuthStore} from "stores/auth-store";
import EssentialLink from "components/EssentialLink.vue";
const linksList = [
  {
    title: 'Сводка',
    caption: '',
    icon: 'leaderboard',
    link: '/profile/review'
  },
  {
    title: 'Чат',
    caption: 'Для общения с другими трейдерами',
    icon: 'chat',
    link: '/profile/chat'
  },
  {
    title: "Позиции",
    caption: "Открытые позиции",
    icon: "density_small",
    link: "/profile/positions"
  },
  {
    title: "Сделки",
    caption: "История сделок",
    icon: "calendar_month",
    link: "/profile/deals"
  }
]
export default {
  components: {EssentialLink},
  setup () {
    const leftDrawerOpen = ref(false)
    const rightDrawerOpen = ref(false)
    const sizeStore = useSizeStore();
    const authStore = useAuthStore();
    return {
      leftDrawerOpen,
      windowWidth: computed(()=>sizeStore.$state.width),
      user: computed(()=>authStore.$state.user),
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },

      rightDrawerOpen,
      toggleRightDrawer () {
        rightDrawerOpen.value = !rightDrawerOpen.value
      },
      linksList
    }
  },
  mounted(){
    let m = document.getElementById("profile-navbar").clientHeight
    console.log(m)
    console.log((m+1).toString()+"px")
    document.body.style.setProperty("--footer-height", (m+2).toString()+"px")
    if(this.$route.path=="/profile"){
      this.$router.push("/profile/review")
    }
    if(!localStorage.getItem("access_token")){
      this.$router.push("/login")
    }
    window.addEventListener("resize", function read_e(e){
      let m = document.getElementById("profile-navbar").clientHeight
      console.log(m)
      console.log((m+1).toString()+"px")
      document.body.style.setProperty("--footer-height", (m+2).toString()+"px")
    })

  }
}
</script>
