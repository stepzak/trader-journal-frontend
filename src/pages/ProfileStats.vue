<template>
  <q-page class="q-pa-lg">
    <div>.</div>
  <div class="margin-navbar">
    <div style="margin-bottom: 1rem; padding-right: 2.5rem; padding-left: 2.5rem;" class="">
    <h3 style="margin: 0; ">Аналитика</h3>
      <div class="q-mt-sm flex align-center" style="gap: 1rem">
        <q-select @update:model-value="ev=>{checkBoard(ev)}" behavior="menu" popup-content-class="bg-secondary-color" outlined label-color="white" options-selected-class="text-primary" color="white" input-class="text-white bg-secondary-color" class="text-white" label="Выберите дашборд" :options="boards" v-model="selectedBoard" style="min-width: 250px; max-width: 400px">
          <template #selected-item >

            <span class="text-white">{{selectedBoard.name}}</span>
          </template>
          <template #option="obj">
            <q-item clickable @click="checkBoard(obj.opt)" :class="obj.selected ? ' bg-primary ' : '  '">
              {{obj.opt.name}}
            </q-item>
          </template>
        </q-select>
        <q-btn style="font-weight: 700" class="hoverable-primary" color="secondary" icon="save" label="Сохранить" text-color="black" @click="saveChanges" />
        <q-btn style="font-weight: 700" :class="'hoverable-primary' + width>500 ?  ' q-ml-auto ': '  '" color="primary" icon="add" label="Добавить виджет" text-color="black" @click="showWidgetDialog=true"></q-btn>
      </div>

    </div>
  <GridLayout v-if="selectedBoard.widgets[0]"
    :layout.sync="selectedBoard.widgets"
               :row-height="this.width>500 ? 25 : 30"
                :col-num="this.width>500 ? 12 : 12"
               :is-draggable="true"
               :is-resizable="true"
              :responsive="true"
              :vertical-compact="false"
              :use-css-transforms="true"
              ref = "gridLayout"
  >
    <GridItem v-for="item in selectedBoard.widgets" class="border-white border-radius-12 q-pa-sm bg-secondary-color"
               :static="false"
               :x="item.x"
               :y="item.y"
               :w="item.w"
               :h="item.h"
               :i="item.i"
               :max-h="layout.filter(obj=>{return obj.templateId === item.templateId})[0].maxH"
               :max-w="layout.filter(obj=>{return obj.templateId === item.templateId})[0].maxW"
               :min-w="layout.filter(obj=>{return obj.templateId === item.templateId})[0].minW"
               :min-h="layout.filter(obj=>{return obj.templateId === item.templateId})[0].minH"
              drag-ignore-from=".no-drag"
    >

      <q-btn icon="cancel" class="remove w-fit q-mt-auto q-mb-sm" @click="removeItem(item.i)" size="sm"></q-btn>
      <div class="no-drag" style="height: 100%; width: 100%">
      <div v-if="item.templateId==='profitsCalendar'" class="item-resizable-height no-drag" >

        <div v-if="Object.entries(profitsCalendar)[0]" style="height: 100%" class="column no-drag">
        <div class="row justify-center items-center">
          <q-btn flat dense @click="calendarPrev" icon="arrow_back_ios" round/>
          {{months[new Date(selectedCalendarDate).getMonth()+1]}} {{new Date(selectedCalendarDate).getFullYear()}}

          <q-btn flat dense icon="arrow_forward_ios" round @click="calendarNext" />
        </div>
        <q-separator />
        <q-calendar-month ref="calendar"
                          use-navigation
                          v-model="selectedCalendarDate"
                          view="month"
                          locale="ru-Ru"
                          animated
                          no-active-date
                          transition-prev="slide-right"
                          transition-next="slide-left"
                          class="item-resizable-height"
                          style="flex: 1 1"
                          dark>
            <template #day="obj">
              <div style="height: 100%" :class="(profitsCalendar[obj.scope.timestamp.date+'T00:00:00'] < 0 ? 'bg-negative ': 'bg-positive ')+'text-center q-mt-auto'" v-if="profitsCalendar[obj.scope.timestamp.date+'T00:00:00']!==0 && !isNaN(profitsCalendar[obj.scope.timestamp.date+'T00:00:00'])">
              {{Math.round(profitsCalendar[obj.scope.timestamp.date+"T00:00:00"]*100)/100}}
              </div>

            </template>
        </q-calendar-month>
      </div>
        <div v-else class="justify-center align-center flex no-drag" style="height: 100%">
          <q-spinner size="lg"></q-spinner>
        </div>
      </div>

      <apexchart class="no-drag" :series="profitFactor.series" :options="profitFactor.chartOptions" type="area" style="max-height: 100%; max-width: 100%;" height="90%" v-else-if="item.templateId==='profitFactor'"/>
      <apexchart ref="stdMeanLossPlot" class="no-drag" title="Отклонение от средних убытков" :series="stdMeanLoss.series" :options="stdMeanLoss.chartOptions" type="area"  height="90%"  v-else-if="item.templateId==='stdMeanLoss'"/>
      <apexchart class="no-drag" :series="dealsCount.series" :options="dealsCount.chartOptions" type="area" style="max-height: 100%; max-width: 100%;" height="90%" v-else-if="item.templateId==='dealsCount'"/>
      <apexchart class="no-drag" :series="avgDealReturns.series" :options="avgDealReturns.chartOptions" type="area" style="max-height: 100%; max-width: 100%;" height="90%" v-else-if="item.templateId==='avgDealProfit'"/>
      <apexchart class="no-drag" :series="portfolioWeights.pieSeries" :options="portfolioWeights.pieOptions" type="pie" style="max-height: 100%; max-width: 100%; " height="90%" v-else-if="item.templateId==='piePortfolioWeight'"/>
      <apexchart class="no-drag" :series="categoriesWeights.pieSeries" :options="categoriesWeights.pieOptions" type="pie" style="max-height: 100%; max-width: 100%;" height="90%" v-else-if="item.templateId==='pieCategoryWeight'"/>
      <div class="item-resizable-height no-drag" v-if="item.templateId==='returnsByPeriod'" style="max-height: 90%">
      <div class="flex w-100 justify-between no-drag " style="align-items: center">
        <q-select behavior="menu" @update:model-value="(e)=>{getReturnsPeriod(e)}" popup-content-class="bg-secondary-color" outlined label-color="white" options-selected-class="text-primary" color="white" input-class="text-white bg-secondary-color" class="text-white" label="Выберите период(в днях)" :options="[1, 7, 30, 365]" v-model="dayPeriod" style="min-width: 100%">
          <template #selected-item="obj">
            <div class="text-white">{{dayPeriod}}</div>
          </template>
        </q-select>
      </div>
      <apexchart  :series="returnsByPeriod.series1" :options="returnsByPeriod.chartOptions1" type="area" class="q-mt-sm no-drag" style="object-fit: contain" width="100%" height="auto"></apexchart>
        </div>

      <div v-else-if="item.templateId === 'efficiency'" class="item-resizable-height no-drag">
        <h6 style="margin-top: 0">Производительность портфеля</h6>

        <!--<div>Коэффициент Шарпа: {{Math.round(10000*efficiency.sharpe)/10000}}</div>
        <div>Альфа: {{Math.round(10000*efficiency.alpha)/10000}}</div>
        <div>Бета: {{Math.round(10000*efficiency.beta)/10000}}</div>-->

        <apexchart :series="efficiency.options.series" :options="efficiency.options" type="bar" height="70%" width="100%" ></apexchart>

        <div class="q-mt-lg" style="font-size: large">Волатильность: {{Math.round(10000*efficiency.volatility)/10000}}</div>

      </div>

      <div v-else-if="item.templateId==='var'" class="column align-center no-drag" style="gap: 1rem">

        <q-input :disable="var_loading" style="width: 100%" v-model="var_trust" label="Доверие" outlined label-color="white" input-class="text-white" @update:model-value="e=>{getVar(e)}"></q-input>
        <div class="q-mt-lg text-center text-h2">VaR:</div>
        <div class="q-mt-lg text-center text-h3" v-if="!var_loading">
          {{Math.round(var_value*1000)/1000}}%
        </div>
        <q-spinner v-else size="lg">

        </q-spinner>
      </div>

      <div v-else-if="item.templateId==='markData'" class="no-drag">
        <h6 style="margin-top: 0">Оценочные данные</h6>
        <div>
          Средняя прибыль/убыток на сделку: <span :class="avgReturns>0 ? 'text-positive' : 'text-negative'">{{Math.round(avgReturns*100)/100}}</span>
        </div>
        <div>
          Процент выигрышных сделок: {{Math.round(winrate*10000)/10000}}%
        </div>
        <div class="q-mt-sm q-pa-sm border-white border-radius-12">
          <div>Общий рост/падение капитала за выбранный период</div>
          <div class="flex justify-evenly " style="gap: 1rem; align-items: center">
            <q-input type = "date" style="" outlined label-color="white" clearable label="От" v-model="fromChange" input-class="text-white" @update:model-value="e=>{getChangePeriod(e, 'start')}"></q-input>
            <div>---</div>
            <q-input clearable type="date" label="До" style="" label-color="white" v-model="toChange" input-class="text-white" @update:model-value="e=>{getChangePeriod(e, 'end')}"></q-input>

          </div>
          <div :class="'flex justify-between q-mt-sm text-h4 ' + (changeByPeriod>0? 'text-positive' : 'text-negative')" style="gap: 1rem; align-items: center; width: 100%; text-align: center; margin-top: 1rem">
            {{Math.round(changeByPeriod*100)/100}} USDT
          </div>
        </div>
      </div>
      </div>
    </GridItem>
  </GridLayout>
  </div>
    <q-dialog v-model="showCreateBoardDialog">
      <q-card class="q-pa-lg bg-secondary-color">
        <q-card-section>
        <q-input label="Название" v-model="newBoardName" outlined label-color="white" input-class="text-white"></q-input>
        </q-card-section>
        <q-card-actions>
          <q-btn class="hoverable-primary" text-color="black" color="primary" label="Создать" @click="createBoard"></q-btn>
        </q-card-actions>
      </q-card>

    </q-dialog>
    <q-dialog v-model="showWidgetDialog" style="max-width: 95vw; max-height: 95vh" maximized>
      <q-card class="q-pa-sm bg-secondary-color flex" style="gap: 1rem; width: 95vw; height: 95vh">
        <div  v-for="item in layout">
        <q-card :style="(width>500 ? 'width: 375px; height: 400px;' : 'width: 99%; height: 350px;') + ''" class="q-pa-sm border-radius-12 border-white bg-dark" v-if="selectedBoard.widgets.length===0 ||!selectedBoard.widgets.map(x=>{return x.templateId}).includes(item.templateId)">
          <q-card-section><div class="text-lg text-weight-bold">{{item.title}}</div></q-card-section>
          <q-card-section><div class="text-caption">{{item.descr}}</div></q-card-section>
          <q-card-section>
            <apexchart :series="examples.portfolioWeights.pieSeries" :options="examples.portfolioWeights.pieOptions" type="pie" width="100%" height="150px" v-if="item.templateId==='piePortfolioWeight'"/>
            <apexchart :series="examples.categoriesWeights.pieSeries" :options="examples.categoriesWeights.pieOptions" type="pie" width="100%" height="150px" v-else-if="item.templateId==='pieCategoryWeight'"/>
            <apexchart :series="examples.series1" :options="examples.chartOptions1" type="area" class="q-mt-sm"   width="100%" height="150px" v-if="item.templateId==='returnsByPeriod'"></apexchart>
            <apexchart :series="examples.efficiency.options.series" :options="examples.efficiency.options" type="bar" class="q-mt-sm"   width="100%" height="150px" v-if="item.templateId==='efficiency'"></apexchart>
          </q-card-section>
          <q-card-actions class="absolute-bottom"><q-btn text-color="black" class="hoverable-primary" color="primary" label="+ Добавить виджет" @click="addItem(item.templateId, item.w, item.h, item.minW, item.minH, item.maxW, item.maxH, item.static)"></q-btn></q-card-actions>
        </q-card>
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { GridLayout, GridItem } from 'grid-layout-plus'
import AnalysisService from "src/services/analysis.service";
import BoardsService from "src/services/boards.service";
import {uid} from "quasar";
import {useSizeStore} from "stores/size-store";
import {computed} from "vue";
import { QCalendarMonth, today } from '@quasar/quasar-ui-qcalendar/src/index'
export default {
  components: {
    GridLayout,
    GridItem,
    QCalendarMonth
  },
  data() {
    return {
      months:{
        1: "Январь",
        2: "Февраль",
        3: "Март",
        4: "Апрель",
        5: "Май",
        6: "Июнь",
        7: "Июль",
        8: "Август",
        9: "Сентябрь",
        10: "Октябрь",
        11: "Ноябрь",
        12: "Декабрь",
      },
      efficiency: {
        options: {
          chart: {
            type: 'bar',
            background: "rgb(21 25 38)",
            events: {
              mounted: (chart) => {
                chart.windowResizeHandler();
              }
            }
          },
          theme: {
            mode: "dark",
            palette: "palette2"
          },
          series: [{
            data: [{
              x: 'Коэффициент Шарпа',
              y: 0
            }, {
              x: 'Альфа',
              y: 0
            }, {
              x: 'Бета',
              y: 0
            }]
          }],
        },
        volatility: 0
      },
      profitsCalendar: {},
      widthStore: useSizeStore(),
      width: computed(() => { return this.widthStore.$state.width}),
      boards: [{name: "+ Добавить новую"}],
      newBoardName: "",
      selectedBoard: {widgets: []},
      showWidgetDialog: false,
      dayPeriod: 7,
      layout: [
        {"x": 0, "y": 0, "w": 4, "h": 13, "i": "0", static: false, minH: 10, minW: 3, maxH: 13, maxW: 6, templateId: "piePortfolioWeight", title: "Распределение активов",
          descr: "Пример представлен ниже",
         },

        {"x": 2, "y": 0, "w": 4, "h": 13, "i": "1", static: false, minH: 12, minW: 3, maxH: 13, maxW: 6, templateId: "pieCategoryWeight", title: "Категории активов",
          descr: "Пример представлен ниже",
       },
        {"x": 0, "y": 2, "w": 6, "h": 13, "i": "2", static: false, minH: 13, minW: 5, maxH: 16, maxW: 6, templateId: "returnsByPeriod",title: "Доход за период",
          descr: "Пример представлен ниже",
         },

        {"x": 2, "y": 2, "w": 4, "h": 13, "i": "3", static: false, minH: 12, minW: 3, maxH: 13, maxW: 6, templateId: "markData", title: "Оценочные данные",
          descr: "В них входят: средняя прибыль на сделку; винрейт; общий рост капитала за выбранные период",
          },
        {"x": 2, "y": 3, "w": 6, "h": 15, "i": "4", static: false, minH: 14, minW: 4, maxH: 17, maxW: 8, templateId: "efficiency",title: "Производительность портфеля",
          descr: "Пример представлен ниже",
        },
        {"x": 0, "y": 3, "w": 4, "h": 12, "i": "5", static: false, minH: 10, minW: 3, maxH: 17, maxW: 8, templateId: "var",title: "Value at Risk",
          descr: "Вычисляемый VaR при заданном доверии",
        },
        {"x": 0, "y": 4, "w": 4, "h": 12, "i": "6", static: false, minH: 10, minW: 3, maxH: 17, maxW: 8, templateId: "profitsCalendar",title: "Доход по дням",
          descr: "Описание",
        },
        {"x": 2, "y": 4, "w": 4, "h": 12, "i": "7", static: false, minH: 10, minW: 3, maxH: 17, maxW: 8, templateId: "profitFactor",title: "Профит фактор",
          descr: "Описание",
        },
        {"x": 2, "y": 5, "w": 4, "h": 12, "i": "8", static: false, minH: 10, minW: 3, maxH: 17, maxW: 8, templateId: "dealsCount",title: "Количество сделок",
          descr: "Описание",
        },
        {"x": 2, "y": 5, "w": 4, "h": 12, "i": "9", static: false, minH: 10, minW: 3, maxH: 17, maxW: 8, templateId: "avgDealProfit",title: "Средний профит за сделку",
          descr: "Описание",
        },
        {"x": 0, "y": 6, "w": 4, "h": 12, "i": "10", static: false, minH: 10, minW: 3, maxH: 17, maxW: 8, templateId: "stdMeanLoss",title: "Отклонение он среднего убытка",
          descr: "Описание",
        },
      ],
      widgetsFuncsEnum:{
        "stdMeanLoss": this.getStdMeanLoss,
        "avgDealProfit": this.getDealAvgProfit,
        "dealsCount": this.getDealsCount,
        "profitFactor": this.getProfitFactor,
        "profitsCalendar": this.getProfitCalendar,
        "var": this.getVar,
        "efficiency": this.calcEfficiency,
        "markData": this.gatherMarkData,
        "returnsByPeriod": this.getReturnsPeriod(7),
        "pieCategoryWeight": this.getCategoriesWeights(),
        "piePortfolioWeight": this.getPortfolioWeights(),

      },
      var_trust: 0.95,
      var_value: 0,
      var_loading: false,
      draggable: true,
      resizable: true,
      index: 0,
      portfolioWeights: {
        pieSeries: [],

        pieOptions: {
          chart: {
            background: "#31384d",
            height: "90%",
            width: "90%",
            type: 'pie',
            fontFamily: 'sans-serif',
            animations: {
              enabled: true,
              easing: 'easeinout',
              speed: 800,
              animateGradually: {
                enabled: true,
                delay: 150
              },
              dynamicAnimation: {
                enabled: true,
                speed: 350
              }
            }
          },
          labels: [],

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
            text: "Распределение активов"
          }

        },
      },

      categoriesWeights: {
        pieSeries: [],

        pieOptions: {
          chart: {
            animations: {
              height: "90%",
              width: "90%",
              enabled: true,
              easing: 'easeinout',
              speed: 800,
              animateGradually: {
                enabled: true,
                delay: 150
              },
              dynamicAnimation: {
                enabled: true,
                speed: 350
              }
            },
            background: "#31384d",
            type: 'pie',
            fontFamily: 'sans-serif',
          },
          labels: [],

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
            text: "Распределение активов по категориям"
          }

        },
      },

      returnsByPeriod: {
        series1: [{
          name: "Прибыль: ",
          data: []
        }],
        chartOptions1: {
          chart: {
            height: "80%",
            width: "100%",
            type: 'area',
            background: "#31384d",
            fontFamily: 'sans-serif',
            zoom: {
              enabled: false
            },
            events: {
              mounted: (chart) => {
                chart.windowResizeHandler();
              }
            }
          },
          dataLabels: {
            enabled: true
          },
          stroke: {
            curve: 'smooth',
          },

          title: {
            text: 'Прибыль за выбранный период',
            align: 'left'
          },
          subtitle: {
            text: '',
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
                  return value + "USDT"
                },
              },
            }
          },
          xaxis: {
            categories: [],
            type: 'datetime',
            title: {
              text: "Дата"
            },

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
      },
      avgReturns: 0,
      winrate: 0,
      fromChange: null,
      toChange: null,
      changeByPeriod: 0,
      selectedCalendarDate: today(),
      showCreateBoardDialog: false,


      examples: {

        efficiency: {
          options: {
            chart: {
              type: 'bar',
              background: "rgb(21 25 38)"
            },
            theme: {
              mode: "dark",
              palette: "palette2"
            },
            tooltip:{
              enabled: false,
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
            series: [{
              data: [{
                x: 'Кф Шарпа',
                y: 1.2
              }, {
                x: 'Альфа',
                y: 0.35
              }, {
                x: 'Бета',
                y: 0.7
              }]
            }],
          },
          volatility: 13500
        },

        series1: [{
          name: "Прибыль: ",
          data: [

            10, -20, 40

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
            enabled: false
          },
          stroke: {
            curve: 'smooth',
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
            categories: ['Jan', 'Feb', 'Mar'],


          },
          yaxis: {
            stepSize: 10
          },
          legend: {
            horizontalAlign: 'left'
          },
        },

        portfolioWeights: {
          pieSeries: [300, 200, 150, 875],

          pieOptions: {
            chart: {
              background: "#31384d",
              height: "90%",
              width: "90%",
              type: 'pie',
              fontFamily: 'sans-serif',
              animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800,
                animateGradually: {
                  enabled: true,
                  delay: 150
                },
                dynamicAnimation: {
                  enabled: true,
                  speed: 350
                }
              }
            },
            labels: ["BTC-USDT", "ETH-USDT", "XRP-USDT", "DOGE-USDT"],

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



          },
        },

        categoriesWeights: {
          pieSeries: [1300, 600],

          pieOptions: {
            chart: {
              animations: {
                height: "90%",
                width: "90%",
                enabled: true,
                easing: 'easeinout',
                speed: 800,
                animateGradually: {
                  enabled: true,
                  delay: 150
                },
                dynamicAnimation: {
                  enabled: true,
                  speed: 350
                }
              },
              background: "#31384d",
              type: 'pie',
              fontFamily: 'sans-serif',
            },
            labels: ["coin", "token"],

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



          },
        },

      },

      profitFactor:{
        series: [{
          name: "Профит фактор",
          data: []
        }],
        chartOptions:{
          chart: {
            height: "80%",
            width: "100%",
            type: 'area',
            background: "#31384d",
            fontFamily: 'sans-serif',
            zoom: {
              enabled: true
            },
            events: {
              mounted: (chart) => {
                chart.windowResizeHandler();
              }
            }
          },
          dataLabels: {
            enabled: true
          },
          stroke: {
            curve: 'smooth',
          },

          title: {
            text: 'Профит фактор',
            align: 'left'
          },
          subtitle: {
            text: '',
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

            }
          },
          xaxis: {
            categories: [],
            type: 'datetime',
            title: {
              text: "Дата"
            },

          },
          yaxis: {
            opposite: true,
            title: {
              text: ''
            }
          },
          legend: {
            horizontalAlign: 'left'
          },
        },


      },
      dealsCount:{
        series: [{
          name: "Количество сделок",
          data: []
        }],
        chartOptions:{
          chart: {
            height: "80%",
            width: "100%",
            type: 'area',
            background: "#31384d",
            fontFamily: 'sans-serif',
            zoom: {
              enabled: true
            },
          },
          dataLabels: {
            enabled: true
          },
          stroke: {
            curve: 'smooth',
          },

          title: {
            text: 'Кол-во сделок',
            align: 'left'
          },
          subtitle: {
            text: '',
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

            }
          },
          xaxis: {
            categories: [],
            type: 'datetime',
            title: {
              text: "Дата"
            },

          },
          yaxis: {
            opposite: true,
            title: {
              text: ''
            }
          },
          legend: {
            horizontalAlign: 'left'
          },
        },


      },
      avgDealReturns:{
        series: [{
          name: "Средний доход за сделку",
          data: []
        }],
        chartOptions:{
          chart: {
            height: "80%",
            width: "100%",
            type: 'area',
            background: "#31384d",
            fontFamily: 'sans-serif',
            zoom: {
              enabled: true
            },
          },
          dataLabels: {
            enabled: true
          },
          stroke: {
            curve: 'smooth',
          },

          title: {
            text: 'Средняя прибыль за сделку',
            align: 'left'
          },
          subtitle: {
            text: '',
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

            }
          },
          xaxis: {
            categories: [],
            type: 'datetime',
            title: {
              text: "Дата"
            },

          },
          yaxis: {
            opposite: true,
            title: {
              text: ''
            }
          },
          legend: {
            horizontalAlign: 'left'
          },
        },


      },
      stdMeanLoss:{
        series: [{
          name: "Отклонение от средних убытков",
          data: []
        }],
        chartOptions:{
          chart: {
            type: 'area',
            background: "#31384d",
            fontFamily: 'sans-serif',
            zoom: {
              enabled: true
            },
            events: {
              mounted: (chart) => {
                chart.windowResizeHandler();
              },

            }
          },
          dataLabels: {
            enabled: true,

              formatter: (value, {seriesName}) => {
                return value + "%"
              },

          },
          stroke: {
            curve: 'smooth',
          },

          title: {
            text: 'Отклонение от средних убытков',
            align: 'left'
          },
          subtitle: {
            text: '',
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
              title: {
                formatter: (value, {seriesName}) => {
                  return value + "%"
                },
              }
            },
            y: {
              formatter: (value, {seriesName}) => {
                return value + "%"
              },

            },
          },
          xaxis: {
            categories: [],
            type: 'datetime',
            title: {
              text: "Дата"
            },

          },
          yaxis: {
            opposite: true,
            title: {
              text: ''
            }
          },
          legend: {
            horizontalAlign: 'left'
          },
        },


      },
    }
  },

  methods:{
    calendarNext () {
      this.$refs.calendar[0].next()
    },

    calendarPrev () {
      this.$refs.calendar[0].prev()
    },

    saveChanges(){
      BoardsService.updateBoard(this.selectedBoard.id, this.selectedBoard).then(res=>{
        this.selectedBoard=res.data
        BoardsService.getBoards().then(res1=>{
          this.boards=res1.data
          this.boards.push({name: "+ Добавить новый"})
          this.$q.notify({color: "positive", message: "Успешно"})
        })
      })
    },
    createBoard(){
      BoardsService.addBoard({name: this.newBoardName, widgets: []}).then(res=>{
        BoardsService.getBoards().then(res1=>{
          this.boards=res1.data
          this.boards.push({name: "+ Добавить новый"})
          this.selectedBoard=res.data
        })
      })
    },

    checkBoard(val){
      console.log(123)
      if(!val.id){
        this.showCreateBoardDialog=true
      }
      else{
        this.selectedBoard=val
        this.selectedBoard.widgets.forEach(async obj=>{
          try{
            await this.widgetsFuncsEnum[obj.templateId]()
          }
          catch{

          }
        })
      }
    },
    async getProfitFactor(){
      await AnalysisService.getProfitFactor().then(res=>{
        //this.profitFactor.series[0].data=res.data
        let labels = []
        Object.entries(res.data).forEach(obj=>{
          //console.log(this.returnsByPeriod.chartOptions1)
          //this.returnsByPeriod.chartOptions1.value.xaxis.categories.push(a)
          labels.push( new Date(obj[0]).getTime()+86400000)

          this.profitFactor.series[0].data.push(Math.round(obj[1]*10)/10)
        })

        this.profitFactor.chartOptions={
          ...this.profitFactor.chartOptions,
          ...{
            xaxis:{
              type: "datetime",
              categories: labels
            }
          }
        }
      })
    },
    async getSharpe(){
      await AnalysisService.getSharpe().then(res=>{
        this.efficiency.options.series[0].data[0].y=Math.round(res.data.sharpe*1000)/1000
      })
    },

    async getAlphaBeta(){
      await AnalysisService.getAlphaBeta().then(res=>{
        console.log(res.data)
        this.efficiency.options.series[0].data[1].y= Math.round(res.data.alpha*1000)/1000
        this.efficiency.options.series[0].data[2].y = Math.round(res.data.beta*1000)/1000
      })
    },

    async getVolatiltiy(){
      await AnalysisService.getVolatility().then(res=>{
        this.efficiency.volatility=Math.round(res.data.volatility*1000)/1000
      })
    },

    async calcEfficiency(){
      await this.getAlphaBeta()
      await this.getVolatiltiy()
      await this.getSharpe
    },

    async getProfitCalendar(){
      await AnalysisService.getReturnsDays(365, "D").then(res=> {
        this.profitsCalendar = res.data
        /*Object.entries(res.data).forEach(obj=>{
          this.profitsCalendar[new Date(obj[0])] = obj[1]
        })
      })*/
      })
    },

    async getDealAvgProfit(){
      await AnalysisService.avgDealReturns().then(res=>{
        let labels = []
        Object.entries(res.data).forEach(obj=>{

          //console.log(this.returnsByPeriod.chartOptions1)
          //this.returnsByPeriod.chartOptions1.value.xaxis.categories.push(a)
          labels.push( new Date(obj[0]).getTime()+86400000)
          this.avgDealReturns.series[0].data.push(Math.round(obj[1]*1000)/1000)
        })

        this.avgDealReturns.chartOptions={
          ...this.avgDealReturns.chartOptions,
          ...{
            xaxis:{
              type: "datetime",
              categories: labels
            }
          }
        }
      })
    },

    async getStdMeanLoss(){
      await AnalysisService.getStdMeanLoss().then(res=>{
        let labels = []
        console.log(res.data)
        Object.entries(res.data).forEach(obj=>{
          //console.log(this.returnsByPeriod.chartOptions1)
          //this.returnsByPeriod.chartOptions1.value.xaxis.categories.push(a)
          labels.push( new Date(obj[0]).getTime()+86400000)
          this.stdMeanLoss.series[0].data.push(Math.round(obj[1]*100)/100)
        })

        this.stdMeanLoss.chartOptions={
          ...this.stdMeanLoss.chartOptions,
          ...{
            xaxis:{
              type: "datetime",
              categories: labels
            }
          }
        }

      })
    },

    async getDealsCount(){
      await AnalysisService.dealsCount().then(res=>{
        let labels = []
        Object.entries(res.data).forEach(obj=>{

          //console.log(this.returnsByPeriod.chartOptions1)
          //this.returnsByPeriod.chartOptions1.value.xaxis.categories.push(a)
          labels.push( new Date(obj[0]).getTime()+86400000)

          this.dealsCount.series[0].data.push(obj[1])
        })

        this.dealsCount.chartOptions={
          ...this.dealsCount.chartOptions,
          ...{
            xaxis:{
              type: "datetime",
              categories: labels
            }
          }
        }
      })
    },

    async getVar(trust = this.var_trust){
      this.var_trust=trust
      setTimeout(()=>{
        if(trust===this.var_trust){
          this.var_loading = true
          AnalysisService.getVar(trust).then(res=>{
            this.var_value=res.data.var
            this.var_loading = false
          })
        }
      }, 500)

    },
    removeItem(i){
      //let key = this.width < 769 ? (this.width>997 ? "lg": "md") : "sm"
      const index = this.selectedBoard.widgets.map(item => item.i).indexOf(i);

      this.selectedBoard.widgets.splice(index, 1);
      /*BoardsService.removeWidget(this.selectedBoard.id, i).then(res=>{
        BoardsService.getBoards().then(res1=>{
          this.boards = res1.data
          this.boards.push({name: "+ Добавить новую"})
          this.selectedBoard=res.data
        })
      })*/
    },
    async addItem(item_id, w, h, minW, minH, maxW, maxH, stat){
      let itemMd = {
        x: (this.selectedBoard.widgets.length * 2) % (this.colNum || (this.width > 500 ? 12: 1)),
        y: this.selectedBoard.widgets.length + (this.width > 500 ? 12: 1), // puts it at the bottom
        w: w,
        h: h,
        minW: minW,
        minH: minH,
        maxW: maxW,
        maxH: maxH,
        static: stat,
        templateId: item_id,
        i: "1"
      }

      try{
        await this.widgetsFuncsEnum[item_id]()
      }
      catch{}

      /*let itemSm = {
        x: 0,
        y: this.selectedBoard.widgets.length + (this.width > 500 ? 12: 1), // puts it at the bottom
        w: w,
        h: h,
        minW: minW,
        minH: minH,
        maxW: maxW,
        maxH: maxH,
        static: stat,
        templateId: item_id,
        i: 1234353
      }*/

      /*BoardsService.addWidget(this.selectedBoard.id, item).then(res=>{
        BoardsService.getBoards().then(res1=>{
          this.boards=res1.data
          this.boards.push({name: "+ Добавить новую"})
          this.selectedBoard=res.data
        })
      })*/
      //this.selectedBoard.widgets.md.push(itemMd)
      this.selectedBoard.widgets.push(itemMd)
      //this.selectedBoard.widgets.sm.push(itemSm)


    },
  async getReturnsPeriod(e){
    this.dayPeriod=e
    console.log(this.returnsByPeriod)
    this.returnsByPeriod.series1[0].data=[]
    this.returnsByPeriod.chartOptions1.xaxis.categories=[]

    await AnalysisService.getReturnsDays(this.dayPeriod).then(res=>{
      let labels = []
      Object.entries(res.data).forEach(obj=>{
        console.log(new Date(obj[0]))
        let a = this.dayPeriod === 1 ? new Date(obj[0]).getHours().toString()+":00" : new Date(obj[0]).getTime()+86400000

        //this.returnsByPeriod.chartOptions1.value.xaxis.categories.push(a)
        labels.push(a)
        console.log(obj[1])
        this.returnsByPeriod.series1[0].data.push(Math.round(obj[1]))
      })
      let type1;
      if(this.dayPeriod===1){
        type1="category"
      }
      else{
        type1="datetime"
      }
      console.log(type1)
      this.returnsByPeriod.chartOptions1={
        ...this.returnsByPeriod.chartOptions1,
        ...{
          xaxis:{
            type: type1,
            categories: labels
          }
        }
      }


    })
  },
  async getChangePeriod(e, type){
    if(type=="start"){
      this.fromChange=e
    }
    else{
      this.toChange=e
    }
    let start, end
    if(this.fromChange){
      start = new Date(this.fromChange).getTime()
    }
    else{
      start = null
    }
    if(this.toChange){
      end = new Date(this.toChange).getTime()
    }
    else{
      end = null
    }

    await AnalysisService.getChangePeriod(start, end).then(res=>{
      this.changeByPeriod = res.data.change
    })
  },
  async getAvgReturns(){
    await AnalysisService.avgReturns().then(res=>{
      this.avgReturns = res.data.avg_profit_loss
    }).catch()
  },
    async getWinrate(){
      await AnalysisService.winrate().then(res=>{
        this.winrate = res.data.winrate*100
      }).catch()
    },


    async gatherMarkData(){
      await this.getAvgReturns()
      await this.getWinrate()
      await this.getChangePeriod(this.toChange, "start")
    },

    async getPortfolioWeights(){
      await AnalysisService.portfolioWeights().then(res=>{
        let labels = []
        let series = []
        Object.entries(res.data).forEach(obj=>{
          console.log(obj)
          labels.push(obj[0])
          series.push(Math.round(obj[1]*1000)/1000)
        })
        this.portfolioWeights.pieSeries=series
        this.portfolioWeights.pieOptions={
          ...this.portfolioWeights.pieOptions,
          ...{
            labels: labels
          }
        }
      }).catch()
    },

    async getCategoriesWeights(){
      await AnalysisService.getCategoriesWeights().then(res=>{
        let data= res.data.weights
        console.log(res.data.weights)
        let labels = []
        let series = []
        Object.entries(data).forEach(obj=>{
          console.log(obj)
          labels.push(obj[0])
          series.push(Math.round(obj[1]*1000)/1000)
        })
        this.categoriesWeights.pieSeries=series
        this.categoriesWeights.pieOptions={
          ...this.categoriesWeights.pieOptions,
          ...{
            labels: labels
          }
        }

      }).catch()
    }
},
async mounted(){

  await BoardsService.getBoards().then(async (res)=>{
    //this.boards=res.data
    /*let boards = []
    res.data.forEach((obj, ind)=>{
      let board = {widgets: {}, name: obj.name}
      board.widgets.lg = obj.widgets
      board.widgets.md = obj.widgets
      board.widgets.sm=[]
      obj.widgets.forEach((w, ind)=>{
        board.widgets.sm.push({...w, x: 0, y: ind})
      })
      boards.push(board)
    })*/
    this.boards=res.data
    this.boards.push({name: "+ Добавить новую"})
    this.selectedBoard=res.data[0]
   /* await this.getStdMeanLoss().catch()
    await this.getProfitFactor().catch()
    await this.getDealsCount().catch()
    await this.getDealAvgProfit().catch()
    await this.getVar(0.95)



    await this.getReturnsPeriod(this.dayPeriod)




    await this.getChangePeriod(null, "start").catch()

    await  this.getSharpe().catch()
    await  this.getAlphaBeta().catch()
    await this.getVolatiltiy().catch()
    await this.getProfitCalendar().catch()*/

    this.selectedBoard.widgets.forEach(async obj=>{
      try{
        await this.widgetsFuncsEnum[obj.templateId]()
      }
      catch{

      }
      this.$refs.gridLayout[0].lastBreakpoint = null;
      this.$refs.gridLayout[0].layouts = {};
    })

  })



}
}
</script>

<style scoped>
.vue-grid-layout {
  background: #eee;
}

.vue-grid-item:not(.vue-grid-placeholder) {
  background: #ccc;
  border: 1px solid black;
}

.vue-grid-item .resizing {
  opacity: 0.9;
}

.vue-grid-item .static {
  background: #cce;
}

.vue-grid-item .text {
  font-size: 24px;
  text-align: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  height: 100%;
  width: 100%;
}

.vue-grid-item .no-drag {
  height: 100%;
  width: 100%;
}

.vue-grid-item .minMax {
  font-size: 12px;
}

.vue-grid-item .add {
  cursor: pointer;
}

.vue-draggable-handle {
  position: absolute;
  width: 20px;
  height: 20px;
  top: 0;
  left: 0;
  background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><circle cx='5' cy='5' r='5' fill='#999999'/></svg>") no-repeat;
  background-position: bottom right;
  padding: 0 8px 8px 0;
  background-repeat: no-repeat;
  background-origin: content-box;
  box-sizing: border-box;
  cursor: pointer;
}

.vgl-item{
  .item-resizable-height{
    height: calc(100% - 40px)
  }
}

</style>
