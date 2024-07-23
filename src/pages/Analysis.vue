<template>
<q-page style="" class="custom-scroll" >
  <div style="" class="custom-scroll" v-scroll="checkScroll" >
    <div style="height: 100vh" class="section-scroll flex justify-evenly align-center">
      <h2 style="max-width: min(760px, 100vw); line-height: 4rem; height: fit-content">
        ПОЛНОСТЬЮ НАСТРАИВАЕМАЯ <div class="text-primary">ПАНЕЛЬ АНАЛИТИКИ</div> С СОТНЯМИ РАЗЛИЧНЫХ МЕТРИК!
      </h2>
      <div style="max-width: min(400px, 100vw); color: silver;  gap: 1rem; font-size: large; height: fit-content" class="column">
        <p>Используя набор готовых виджетов, вы можете создать свою собственную доску аналитики, потратив на это всего 5 минут.</p>

        <p>А возможность фильтровать сделки по десяткам показателей позволит найти узкие места вашей торговли, исправить их и вывести ваш заработок на совершенно новый уровень.</p>

        <p>Создавайте стратегии, сравнивайте подходы, выбирайте что получается у вас лучше всего и забирайте у рынка деньги!</p>
      </div>
    </div>
    <div style="" class="section-scroll text-center bg-secondary-color h-fit q-pa-lg-lg sep-bottom">
      <h2 class="text-center column" style="gap: 1rem; padding: 2rem">
        <p>Анализ сделок - <span class="text-primary">это легко!</span>
        </p>
        <p>Смотрите сами</p>
      </h2>
    </div>
    <div style="height: 100vh; gap: 1rem; " class="section-scroll flex justify-center align-center bg-secondary-color sep-bottom" v-scroll-fire="fireScroll1">

      <div v-scroll-fire="fireScroll1" style="width: 45%; min-height: 1px">
        <div style="width: 100%"></div>
        <transition
          enter-active-class="animated backInLeft slower "
          leave-active-class="animated bounceOutUp"
          :duration="3000">
          <div class="text-h3" id="block1"  v-if="fire1" style="max-width: min(100vw, 600px); min-width: max(45%, 500px);">
            <div class="flex" style="gap: .3rem">
            <div style="color: var(--text-secondary-color)" class="w-fit">I. </div>
              <div> </div>
            <div style="width: fit-content"> Отслеживайте свою <br></div>
            </div>
            <div style="color: goldenrod">прибыль</div></div>
        </transition>
      </div>
      <q-separator dark vertical style="height: 100%" v-if="windowWidth>960"/>
      <transition
        enter-active-class="animated backInRight slower delay-1s"
        leave-active-class="animated bounceOutUp"
        :duration="3000"
      ref="test">
        <div id="chart1" style="height: 50%; width: 45%" v-if="fire1">
          <apexchart type="area" height="100%" ref="chart1" :options="chartOptions1" :series="series1"></apexchart>
        </div>
      </transition>
    </div>

    <div style="height: 100vh; gap: 1rem; " class="section-scroll flex justify-center align-center bg-secondary-color sep-bottom">

      <div style="width: 45%; height: 50%">
      <div style="width: 100%"></div>
      <transition
        enter-active-class="animated bounceInLeft slower delay-1s"
        leave-active-class="animated bounceOutUp"
        :duration="3000"
        ref="test">

        <div id="chartPie" style="height: 100%; width: 100%" v-if="fire2">
          <apexchart type="pie" height="100%" ref="chartPie" :options="pieOptions" :series="pieSeries"></apexchart>
        </div>

      </transition>
      </div>
      <q-separator dark vertical style="height: 100%" v-if="windowWidth>960"/>
      <div v-scroll="" style="width: 45%">
        <transition
          enter-active-class="animated backInRight slower "
          leave-active-class="animated bounceOutUp"
          :duration="3000">
          <div class="text-h3" id="block1"  v-if="fire2" style="max-width: min(100vw, 600px); min-width: max(45%, 500px);">
            <div class="flex" style="gap: .3rem">
              <div style="color: var(--text-secondary-color)" class="w-fit">II. </div>
              <div> </div>
              <div style="width: fit-content"> Найдите самые  <br></div>
            </div>
            <div style="color: darkred">убыточные пары</div></div>
        </transition>
      </div>
    </div>
    <div style="height: 100vh; gap: 1rem; " class="section-scroll flex justify-center align-center bg-secondary-color sep-bottom">

      <div v-scroll-fire="" style="width: 45%; min-height: 1px">
        <div style="width: 100%"></div>
        <transition
          enter-active-class="animated backInLeft slower "
          leave-active-class="animated bounceOutUp"
          :duration="3000">
          <div class="text-h3" id="block3"  v-if="fire3" style="max-width: min(100vw, 600px); min-width: max(45%, 500px);">
            <div class="flex" style="gap: .3rem">
              <div style="color: var(--text-secondary-color)" class="w-fit">III. </div>
              <div> </div>
              <div style="width: fit-content"> Узнайте ваше самое прибыльное и убыточное
                <br></div>
            </div>
            <div style="color: rebeccapurple">время для торговли</div></div>
        </transition>
      </div>
      <q-separator dark vertical style="height: 100%" v-if="windowWidth>960"/>
      <transition
        enter-active-class="animated backInRight slower delay-1s"
        leave-active-class="animated bounceOutUp"
        :duration="3000"
        ref="test">
        <div id="chart3" style="height: 50%; width: 45%; background: rgb(66, 66, 66)" v-if="fire3">
          <apexchart type="bar" height="100%" ref="chart3" :options="test.data.chartOptions" :series="test.data.series"></apexchart>
        </div>
      </transition>
    </div>

    <div style="height: 100vh; gap: 1rem; " class="section-scroll flex justify-center align-center bg-secondary-color sep-bottom">

      <div style="width: 45%; height: 50%">
        <div style="width: 100%"></div>
        <transition
          enter-active-class="animated bounceInLeft slower delay-1s"
          leave-active-class="animated bounceOutUp"
          :duration="3000"
          ref="test">

          <div id="chartBar2" style="height: 100%; width: 100%" v-if="enterReasons.fire4">
            <apexchart type="bar" height="100%" ref="chartBar2" :options="enterReasons.chartOptions" :series="enterReasons.series"></apexchart>
          </div>

        </transition>
      </div>
      <q-separator dark vertical style="height: 100%" v-if="windowWidth>960"/>
      <div v-scroll="" style="width: 45%">
        <transition
          enter-active-class="animated backInRight slower "
          leave-active-class="animated bounceOutUp"
          :duration="3000">
          <div class="text-h3" id="block1"  v-if="fire2" style="max-width: min(100vw, 600px); min-width: max(45%, 500px);">
            <div class="flex" style="gap: .3rem">
              <div style="color: var(--text-secondary-color)" class="w-fit">IV. </div>
              <div> </div>
              <div style="width: fit-content">Поймите, какие   <br></div>
            </div>
            <div style="color: var(--q-primary)">причины входа</div>
            <div>не приносят вам прибыли </div>
          </div>

        </transition>
      </div>
    </div>

    <div class="h-fit pa-lg">
      <div class="text-h2 text-center w-100" style="gap: 12px">
        Ваши возможности <div class="color-primary">безграничны!</div>
      </div>
      <div class="flex bg-secondary-color justify-evenly align-center mt-lg" style="border: 1px solid whitesmoke; border-radius: 12px; padding: 1rem; gap: 1rem">
        <transition
          enter-active-class="animated bounceInLeft slower"
          leave-active-class="animated bounceOutUp"
          :duration="3000"
          ref="test">
          <div id="chartBottom1" style="min-height: 300px; width: 45%" v-if="fire5">
            <apexchart type="area" height="100%" ref="chartBottom1" :options="chartOptions1" :series="series1"></apexchart>
          </div>
        </transition>

        <transition
          enter-active-class="animated backInRight slower delay-1s"
          leave-active-class="animated bounceOutUp"
          :duration="3000"
          ref="test">

          <div id="chartBottom2" style="min-height: 300px; width: 45%" v-if="fire5">
            <apexchart type="pie" height="100%" ref="chartBottom2" :options="pieOptions" :series="pieSeries"></apexchart>
          </div>

        </transition>

        <transition
          enter-active-class="animated bounceInLeft slower delay-2s"
          leave-active-class="animated bounceOutUp"
          :duration="3000"
          ref="test">
          <div id="chartBottom3" style="min-height: 300px; width: 45%; background: rgb(66, 66, 66)" v-if="fire5">
            <apexchart type="bar" height="100%" ref="chartBottom3" :options="test.data.chartOptions" :series="test.data.series"></apexchart>
          </div>
        </transition>

        <transition
          enter-active-class="animated backInRight slower delay-3s"
          leave-active-class="animated bounceOutUp"
          :duration="3000"
          ref="test">

          <div id="chartBottom4" style="min-height: 300px; width: 45%" v-if="fire5">
            <apexchart type="bar" height="100%" ref="chartBottom4" :options="enterReasons.chartOptions" :series="enterReasons.series"></apexchart>
          </div>

        </transition>
      </div>
    </div>
  </div>
</q-page>
</template>



<script>
import {useSizeStore} from "stores/size-store";
import {computed} from "vue";

export default {
  name: "Analysis",
  components:{
  },
  data(){
    return {
      sizeStore: useSizeStore(),
      windowWidth: computed(() => this.sizeStore.$state.width),
      fire1: false,


      series1: [{
        name: "Прибыль: ",
        data: [

          1000, 100, 500, 900, -300, 250, 1200, 400, 150, -400

        ]
      }],
      chartOptions1: {
        chart: {
          type: 'area',
          background: "rgb(21 25 38)",
          fontFamily: 'sans-serif',
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: true
        },
        stroke: {
          curve: 'smooth',
        },

        title: {
          text: 'Прибыль за год',
          align: 'left'
        },
        subtitle: {
          text: 'По месяцам',
          align: 'left'
        },
        theme: {
          mode: 'dark',
          palette: 'palette2',
          monochrome: {
            enabled: false,
            color: '#255aee',
            shadeTo: 'light',
            shadeIntensity: 0.65
          },
        },
        tooltip: {
          enabled: true,
          enabledOnSeries: undefined,
          shared: true,
          followCursor: false,
          intersect: false,
          inverseOrder: false,
          custom: undefined,
          hideEmptySeries: true,
          fillSeriesColor: true,
          theme: false,
          style: {
            fontSize: '12px',
            fontFamily: undefined
          },
          onDatasetHover: {
            highlightDataSeries: false,
          },
          x: {
            show: true,
            formatter: undefined,
          },
          y: {
            formatter: undefined,
            title: {
              formatter: (value, {seriesName}) => {
                return value + "$"
              },
            },
          }
        },
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', "Dec"],

          title: {
            text: "Месяцы"
          }
        },
        yaxis: {
          opposite: true,
          title: {
            text: 'Доход'
          }
        },
        legend: {
          horizontalAlign: 'left'
        },
      },

      pieSeries: [14, 400, 250, 600, 330],

      pieOptions: {
        chart: {
          background: "rgb(21 25 38)",
          type: 'pie',
          fontFamily: 'sans-serif',
        },
        labels: ['XRPUSDT', 'DOGEUSDT', 'SHIBUSDT', 'BTCUSDT', 'ETHUSDT'],

        tooltip: {
          enabled: true,
          y: {
            formatter: (value) => {
              return value + "$"
            },
          }
        },
        theme: {
          mode: "dark",
          palette: "palette2"
        },

        title: {
          text: "Самые убыточные пары"
        }

      },
      fire2: false,

      series3: [{
        name: 'Прибыль',
        data: [100, 400, 300, 500, 230, 900, 0, 0, 0, 130, 200, 500
        ]
      },
        {
          name: 'Убытки',
          data: [0, 0, 0, 0, 0, 0, -100, -250, -500, 0, 0, 0,
          ]
        }
      ],
      fire3: false,
      test: {
        data: {

          series: [{
            name: 'Прибыль',
            data: [100, 400, 300, 500, 230, 900, 0, 0, 0, 130, 200, 500
            ]
          },
            {
              name: 'Убытки',
              data: [0, 0, 0, 0, 0, 0, -100, -250, -900, 0, 0, 0,
              ]
            }
          ],
          chartOptions: {
            chart: {
              type: 'bar',
              stacked: true,
              fontFamily: 'sans-serif',
              background: "rgb(21 25 38)"
            },
            legend: {
              enabled: false
            },
            theme: {
              mode: "dark"
            },
            colors: ['#238f1e', '#f10404'],
            plotOptions: {
              bar: {
                borderRadius: 5,
                borderRadiusApplication: 'end', // 'around', 'end'
                borderRadiusWhenStacked: 'all', // 'all', 'last'
                horizontal: true,
                barHeight: '70%',
              },
            },
            dataLabels: {
              enabled: false
            },
            grid: {
              xaxis: {
                lines: {
                  show: false
                }
              }
            },
            yaxis: {
              stepSize: 500
            },
            tooltip: {
              shared: false,
              x: {
                formatter: function (val) {
                  return val
                }
              },
              y: {
                formatter: function (val) {
                  return val + "$"
                }
              }
            },
            title: {
              text: 'Прибыль по времени суток'
            },
            xaxis: {
              categories: ['0:00-1:59', '2:00-3:59', '4:00-5:59', '6:00-7:59', '8:00-9:59', '10:00-11:59', '12:00-13:59', '14:00-15:59',
                '16:00-17:59', '18:00-19:59', '20:00-21:59', '22:00-23:59'
              ],
              title: {
                text: ''
              },
              labels: {
                enabled: false,
                formatter: function (val) {
                  return val + "$"
                }
              }
            },
          },
        },
          },
      enterReasons: {
        fire4: false,
        series: [{
          name: "Прибыль по причинам входа",
          data: [100, 350, 0, 1000]
        },
          {
            name: "Убытки по причинам входа",
            data: [0, 0, -400, 0]
          }],
        chartOptions: {
          chart: {
            type: 'bar',
            stacked: true,
            fontFamily: 'sans-serif',
            background: "rgb(21 25 38)"
          },
          legend: {
            enabled: false
          },
          theme: {
            mode: "dark"
          },
          colors: ['#238f1e', '#f10404'],
          plotOptions: {
            bar: {
              borderRadius: 5,
              borderRadiusApplication: 'end', // 'around', 'end'
              borderRadiusWhenStacked: 'all', // 'all', 'last'
              horizontal: true,
              barHeight: '70%',
            },
          },
          dataLabels: {
            enabled: false
          },
          grid: {
            xaxis: {
              lines: {
                show: false
              }
            }
          },
          yaxis: {
            stepSize: 250
          },
          tooltip: {
            shared: false,
            x: {
              formatter: function (val) {
                return val
              }
            },
            y: {
              formatter: function (val) {
                return val + "$"
              }
            }
          },
          title: {
            text: 'Прибыль по причинам входа'
          },
          xaxis: {
            categories: [
              'Volality',
              'Daily low',
              'Level retest',
              'Level breakdown'
            ],
            title: {
              text: ''
            },
            labels: {
              enabled: false,
              formatter: function (val) {
                return val + "$"
              }
            }
          },
        },
      },
      fire5: false
    }


  },
  methods:{
    fireScroll1(){
        this.fire1 = true
    },
    checkScroll(){
      let scr =document.querySelector(':root').scrollTop
      if(scr/window.innerHeight>=4.5){
        this.fire5=true
      }
      else if(scr/window.innerHeight>=4 && !this.enterReasons.fire4){
        this.enterReasons.fire4=true
      }
      else if(scr/window.innerHeight>=3 && !this.fire3){
        this.fire3=true
      }
      else if(scr/window.innerHeight>=2 && !this.fire2){
        this.fire2=true
      }
    }

  },
  mounted(){
    //new VueApexCharts(document.getElementById("chart1")).render()
  }
}
</script>

<style>
.bg-secondary-color{
  background-color: #31384d;
}

.align-center{
  align-content: center;
}

.apexcharts-tooltip {
  background: var(--q-primary);
  color: black;
}

.apexcharts-menu-item:hover{
  background: white;
  color: black
}

.h-fit{
  height: fit-content!important;

}

.sep-bottom{
  border-bottom: 4px solid rgba(255, 255, 255, 0.28);
}

.color-primary{
  color: var(--q-primary)
}

</style>
