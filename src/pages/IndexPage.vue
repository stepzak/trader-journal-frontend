<template>
  <q-page class="snap-scrolling" style="overflow-y: auto">
      <div style="height: 100vh; " class="section-scroll main-section">
        <transition appear
                    enter-active-class="animated bounceInLeft slower delay-1s"
                    leave-active-class="animated fadeOut"
        :duration="10000">


          <div class="mt-lg-nav ml-lg" style="">
            <h2 style="max-width: 250px; margin-top: 0; margin-bottom: 1.5rem"><div class="text-green-9">Дневник</div> <div style="color: var(--q-primary)">трейдера</div></h2>
            <div style="max-width: 280px; font-size: large; line-height: 2.5rem; color: lightgray">
              Лучший Автоматизированный
              Журнал Сделок Трейдера
              Криптовалют
            </div>
            <q-btn rounded color="primary" style="margin-top: 2rem; padding: 1rem 2rem;" size="md" padding="20" class="hoverable-primary"><div style="color: black">Создать аккаунт -></div></q-btn>
          </div>
        </transition>
      </div>
      <div style="height: 100vh; align-items: center" class="section-scroll flex ">
        <q-splitter v-model="splitter1" style="width: 100%; padding: 0 10% 0 0; overflow-y: hidden; height: 85vh" :limits="[0, 100]" disable v-if="windowWidth>1100" class="margin-navbar">
          <template #before style="margin-right: 2rem" class="overflow-hidden-y">
            <div style="margin-left: -70vw; overflow: hidden; height: 100%" id="block1">
          <img  src="../assets/test/block-1.webp" style="border: 1px solid rebeccapurple; border-radius: 10px; width: 75vw; object-fit: fill; height: 100%"  @mouseover="block1animate(1, 99)" @mouseleave="block1animate(-1, 50)"/>
            </div>
          </template>
          <template #separator>
            <q-separator color="grey-10" vertical style="height: 100%; width: 2px"></q-separator>
          </template>
          <template #after>
            <div style="margin-left: 2rem">
            Текст бла бла бла
            </div>
          </template>
        </q-splitter>
        <div class="column w-100" style="align-items: center; gap: 2rem" v-else>
          <div>Текст бла бла бла</div>
          <img  src="../assets/test/block-1.webp" style="border: 1px solid rebeccapurple; border-radius: 10px; width: 100%; object-fit: fill; max-height: 70vh">

        </div>
      </div>
      <div style="height: 100vh; align-items: center" class="section-scroll flex">
        <q-splitter reverse v-model="splitter2" style="width: 100%; padding: 0 0 0 0; overflow-y: hidden; height: 85vh" :limits="[0, 100]" disable v-if="windowWidth>1100" class="margin-navbar">
          <template #after style="margin-right: 2rem" class="overflow-hidden-y">
            <div style="margin-left: 20vw;height: 100%; overflow: hidden" id="block2">
              <img  src="../assets/test/block-1.webp" style="border: 1px solid lightgray; border-radius: 10px; width: 75vw; object-fit: fill; height: 100%"  @mouseover="block2animate(1, 99)" @mouseleave="block2animate(-1, 50)"/>
            </div>
          </template>
          <template #separator>
            <q-separator color="grey-10" vertical style="height: 100%; width: 2px"></q-separator>
          </template>
          <template #before>
            <div style="margin-left: 2rem">
              Текст бла бла бла
            </div>
          </template>
        </q-splitter>
        <div class="column w-100" style="align-items: center; gap: 2rem" v-else>
          <div>Текст бла бла бла</div>
          <img  src="../assets/test/block-1.webp" style="border: 1px solid lightgray; border-radius: 10px; width: 100%; object-fit: fill; max-height: 70vh">

        </div>
      </div>
      <div style="height: 100vh; align-items: center" class="section-scroll flex">
        <q-carousel

          v-model="slide"
          transition-prev="slide-right"
          transition-next="slide-left"
          swipeable
          animated
          control-color="primary"
          padding
          arrows
          infinite
          height="90vh"
          style="width: 100%; background: transparent; margin-top: calc(var(--scroll-margin) + 12px)"
          class="q-pa-sm"

        >
          <q-carousel-slide :name="1" class="" style="gap: 1rem; align-items: center; overflow-y: hidden; display: flex; flex-direction: column;">
              <SymbolOverview :options="slide1options" style="width: 50%; height: 80%; min-width: 270px">

              </SymbolOverview>
            <div class="w-100 text-center"><a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank" style="text-decoration-color: var(--q-primary); text-align: center"><span style="color: var(--q-primary); text-decoration: none">Track all markets on TradingView</span></a></div>
            <div class="q-mt-md-lg" style="color: silver; text-align: center; margin-top: 1rem; font-size: x-large">Доступ к историческим данным на графике с каждым вашим шагом в сделке</div>
          </q-carousel-slide>
          <q-carousel-slide :name="2" class="flex justify-center" style="width: 75%; overflow-y: hidden" >
            <q-img src="../assets/test/block-1.webp" height="90%" :img-style="{'minWidth': '360px'}" style="min-width: 300px">
              <div class="custom-caption absolute-bottom">
                <div class="" style="font-size: small">Доступ к историческим данным на графике с каждым вашим шагом в сделке</div>

              </div>
            </q-img>

          </q-carousel-slide>
        </q-carousel>
      </div>
      <div style="background-color: #1c2236; padding: 5rem 2rem 5rem 2rem; scroll-snap-align: end; min-height: 50vh" >
        <div class="flex" style="gap: 1rem">
          <div class="text-h6" style="color: white">МЕНЮ</div>
        </div>
        <div style="font-size: small; color: silver; text-align: center; margin-top: 3rem">Информация, предоставленная на этом веб-сайте, предназначена только для информационных и образовательных целей. Веб-сайт не держит или не оперирует активами пользователей и не предоставляет инвестиционные, финансовые, правовые, налоговые или другие советы. Любой анализ или визуальное представление финансовых данных предназначено для общей информации и не должно служить основанием для принятия инвестиционных решений. Пользователи всегда должны проводить свои собственные исследования и принимать собственные решения.</div>
      </div>

  </q-page>
</template>

<script>
import {computed, defineComponent, ref} from 'vue';
import {useSizeStore} from "stores/size-store";
import { SymbolOverview } from 'vue-tradingview-widgets';

export default defineComponent({
  name: 'IndexPage',
  components: {SymbolOverview},
  data(){
    return {
      sizeStore: useSizeStore(),
      windowWidth: computed(()=>this.sizeStore.$state.width),
      barStyle: {
        right: '2px',
        borderRadius: '12px',
        backgroundColor: 'rgba(33,36,49,0)',
        width: '9px',
        opacity: 0.2
      },
      thumbStyle: {
        right: '4px',
        borderRadius: '5px',
        backgroundColor: '#2c3449',
        width: '5px',
        opacity: 0.75
      },
      splitters: [50],
      splitter1: 50,
      splitter2: 50,
      stops: [[false, false]],
      slide: 1,
      slide1options: {
        "symbols": [
          [
            "BINANCE:BTCUSDT|1D"
          ],
          [
            "BITSTAMP:ETHUSD|1D"
          ]
        ],
        "chartOnly": false,
        "width": "100%",
        "height": "100%",
        "locale": "en",
        "colorTheme": "dark",
        "autosize": true,
        "showVolume": false,
        "showMA": false,
        "hideDateRanges": false,
        "hideMarketStatus": false,
        "hideSymbolLogo": false,
        "scalePosition": "right",
        "scaleMode": "Normal",
        "fontFamily": "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
        "fontSize": "10",
        "noTimeScale": false,
        "valuesTracking": "1",
        "changeMode": "price-and-percent",
        "chartType": "area",
        "maLineColor": "#2962FF",
        "maLineWidth": 1,
        "maLength": 9,
        "lineWidth": 2,
        "lineType": 0,
        "dateRanges": [
          "1d|1",
          "1m|30",
          "3m|60",
          "12m|1D",
          "60m|1W",
          "all|1M"
        ]
      }
    }
  },
  computed:{

  },
  mounted(){

  },
  methods:{
    sleepLoop(val, to, sleep, step, stop_var){
      setTimeout(()=>{
        eval(val+`+=${step.toString()}`)
        if((eval(val)<to && step>0 || eval(val)>to && step<0) && eval(stop_var)===false){
          this.sleepLoop(val, to, sleep, step, stop_var)
        }
      }, sleep)

    },
    async block1animate(k, to){
      let en = {
        "-1": ["-60vw", "left-out", "this.stops[0][1]", "this.stops[0][0]"],
        "1": ["10vw", "left-in", "this.stops[0][0]", "this.stops[0][1]"],
      }
      //let el = document.getElementById()
        eval(en[k][2]+"=false")
        eval(en[k][3]+"=true")
        document.getElementById("block1").style.marginLeft=en[k][0]
        document.getElementById("block1").classList.add(en[k][1])
        setTimeout(()=>{
          document.getElementById("block1").classList.remove(en[k][1])
        }, 2000)

      this.sleepLoop("this.splitter1", to, 20, 1*k, en[k][2])
    },
    async block2animate(k, to){
      let en = {
        "-1": ["20vw", "left-in", "this.stops[0][1]", "this.stops[0][0]"],
        "1": ["10vw", "left-out", "this.stops[0][0]", "this.stops[0][1]"],
      }
      //let el = document.getElementById()
      eval(en[k][2]+"=false")
      eval(en[k][3]+"=true")
      document.getElementById("block2").style.marginLeft=en[k][0]
      document.getElementById("block2").classList.add(en[k][1])
      setTimeout(()=>{
        document.getElementById("block2").classList.remove(en[k][1])
      }, 2000)

      this.sleepLoop("this.splitter2", to, 20, 1*k, en[k][2])
    }

  }
});
</script>

<style>
.w-100{
  width: 100%
}
.section-scroll{
  scroll-snap-align: start;
  padding-top: 1px;
  margin-top: -1px;
  //scroll-margin: var(--scroll-margin)
}
.custom-scroll{
  scrollbar-width: thin;
  scrollbar-color: #2c3449 transparent;
  scrollbar-gutter: both-edges;
  scrollbar-arrow-color: transparent;
}

.main-section{
  background-image: url('../assets/test/main-bg.webp');
  background-repeat: no-repeat;
  background-size: cover;
}

.snap-scrolling{
  scroll-snap-type: y mandatory; overflow-y: auto; max-height: 100vh
}
.mt-lg-nav{
  margin-top: calc(var(--scroll-margin) + 15vh)!important;
}
.ml-lg{
  margin-left: 15vw!important;
}

@keyframes left-in {
  20% {
    transform: translateX(-60vw);
  }
  20% {
    transform: translateX(-46vw);
  }
  40% {
    transform: translateX(-32vw);
  }
  80% {
    transform: translateX(-16vw);
  }
  100% {
    transform: translateX(0vw);
  }

}

@keyframes left-out {
  100% {
    transform: translateX(-60vw);
  }
  80% {
    transform: translateX(-46vw);
  }
  60% {
    transform: translateX(-32vw);
  }
  40% {
    transform: translateX(-16vw);
  }
  20% {
    transform: translateX(0vw);
  }

}

.left-in{
  animation: left-in;
  transition: 2s;
}

.left-out{
  animation: left-out;
  transition: 2s;
}

.q-panel-parent {
  .q-panel{
    display: flex;
    justify-content: center;
  }
}

.q-splitter--vertical > div{
  color: lightgray;
  border-color: lightgray;
}

.custom-caption {
  text-align: center;
  padding: 2rem;
  color: white;
  background-color: rgba(0, 0, 0, .3)
}
#tradingview-symbol-overview{
  height: 80%!important;
  content: "Loading..."
}

.align-center{
  align-items: center
}

.scroll-inner{
  body{
    overflow-y: hidden;
  }
}

.mt-lg{
  margin-top: 4rem!important;
}

.w-90{
  width: 90%
}

.gap-md{
  gap: .5rem!important;
}

.gap-lg{
  gap: 1rem!important;
}

</style>
