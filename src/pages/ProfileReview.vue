<template>
<q-page class="q-pa-lg">
  <div class="margin-navbar">
    <div>
    <h2 class="text-white">Сводка</h2>
    <h4>Распределение активов</h4>
    <div class="flex justify-between q-pa-sm" >
      <apexchart :series="portfolioWeights.pieSeries" :options="portfolioWeights.pieOptions" type="pie"  style="width: min(45%, 90vw); height: 400px; min-width: 350px" height="400"></apexchart>

        <!--<div class="flex w-100 justify-between" >
        <q-select popup-content-class="bg-secondary-color" outlined label-color="white" options-selected-class="text-white" hide-selected color="white" input-class="text-white bg-secondary-color" class="text-white" label="Выберите период(в днях)" :options="[1, 7, 30, 365]" v-model="dayPeriod" style="min-width: 70%">

        </q-select>
          <q-btn label="Обновить" @click="getReturnsPeriod"></q-btn>
        </div>
        <apexchart :series="returnsByPeriod.series1" :options="returnsByPeriod.chartOptions1" type="area" class="q-mt-sm"></apexchart>-->
        <apexchart :series="categoriesWeights.pieSeries" :options="categoriesWeights.pieOptions" type="pie"  style="width: min(45%, 90vw); height: 400px; min-width: 350px" height="400"></apexchart>
    </div>
    </div>
    <h4>Доходность</h4>
    <div class="flex justify-evenly w-100 q-pa-sm">
      <div style="width: min(45%, 90vw); height: fit-content; min-width: 350px; padding: 1rem" class="border-white border-radius-12">
      <div class="flex w-100 justify-between" style="align-items: center">
        <q-select @update:model-value="(e)=>{getReturnsPeriod(e)}" popup-content-class="bg-secondary-color" outlined label-color="white" options-selected-class="text-primary" color="white" input-class="text-white bg-secondary-color" class="text-white" label="Выберите период(в днях)" :options="[1, 7, 30, 365]" v-model="dayPeriod" style="min-width: 100%">
          <template #selected-item="obj">
            <div class="text-white">{{dayPeriod}}</div>
          </template>
        </q-select>
      </div>
      <apexchart :series="returnsByPeriod.series1" :options="returnsByPeriod.chartOptions1" type="area" class="q-mt-sm"  ></apexchart>
    </div>
      <div style="padding: 1rem; gap: .5rem; width: min(45%, 90vw);" class="flex column w-fit border-white border-radius-12">
        <h6 style="margin-top: 0">Оценочные данные</h6>
        <div>
          Средняя прибыль/убыток на сделку: <span :class="avgReturns>0 ? 'text-positive' : 'text-negative'">{{Math.round(avgReturns*100)/100}}</span>
        </div>
        <div>
          Процент выигрышных сделок: {{Math.round(winrate*10000)/10000}}%
        </div>
        <div class="q-mt-sm q-pa-sm border-white border-radius-12">
          <div>Общий рост/падение капитала за выбранный период</div>
          <div class="flex justify-between " style="gap: 1rem; align-items: center">
            <q-input type = "date" style="width: 45%" outlined label-color="white" clearable label="От" v-model="fromChange" input-class="text-white" @update:model-value="e=>{getChangePeriod(e, 'start')}"></q-input>
            <div>---</div>
            <q-input clearable type="date" label="До" style="width: 45%" label-color="white" v-model="toChange" input-class="text-white" @update:model-value="e=>{getChangePeriod(e, 'end')}"></q-input>

          </div>
          <div :class="'flex justify-between q-mt-sm ' + (changeByPeriod>0? 'text-positive' : 'text-negative')" style="gap: 1rem; align-items: center">
            {{Math.round(changeByPeriod*100)/100}} USDT
          </div>
        </div>
      </div>
    </div>
  </div>
  <grid-layout :layout.sync="layout"
               :is-draggable="draggable"
               :is-resizable="resizable"
               :vertical-compact="true"
               :use-css-transforms="true"
  >
    <grid-item v-for="item in layout"
               :static="item.static"
               :x="item.x"
               :y="item.y"
               :w="item.w"
               :h="item.h"
               :i="item.i"
    >
      <span class="text">{{item.i}}</span>
    </grid-item>
  </grid-layout>
</q-page>
</template>

<script>
import AnalysisService from "src/services/analysis.service";
import {ref} from "vue";
import {GridLayout, GridItem} from 'grid-layout-plus';
export default {
  name: "ProfileReview",
  components:{
    GridLayout,
    GridItem
  },
  data(){
    return {
      layout: [
        {"x":0,"y":0,"w":2,"h":2,"i":"0", static: false},
        {"x":2,"y":0,"w":2,"h":4,"i":"1", static: true},
        {"x":4,"y":0,"w":2,"h":5,"i":"2", static: false},
        {"x":6,"y":0,"w":2,"h":3,"i":"3", static: false},
        {"x":8,"y":0,"w":2,"h":3,"i":"4", static: false},
        {"x":10,"y":0,"w":2,"h":3,"i":"5", static: false},
        {"x":0,"y":5,"w":2,"h":5,"i":"6", static: false},
        {"x":2,"y":5,"w":2,"h":5,"i":"7", static: false},
        {"x":4,"y":5,"w":2,"h":5,"i":"8", static: false},
        {"x":6,"y":3,"w":2,"h":4,"i":"9", static: true},
        {"x":8,"y":4,"w":2,"h":4,"i":"10", static: false},
        {"x":10,"y":4,"w":2,"h":4,"i":"11", static: false},
        {"x":0,"y":10,"w":2,"h":5,"i":"12", static: false},
        {"x":2,"y":10,"w":2,"h":5,"i":"13", static: false},
        {"x":4,"y":8,"w":2,"h":4,"i":"14", static: false},
        {"x":6,"y":8,"w":2,"h":4,"i":"15", static: false},
        {"x":8,"y":10,"w":2,"h":5,"i":"16", static: false},
        {"x":10,"y":4,"w":2,"h":2,"i":"17", static: false},
        {"x":0,"y":9,"w":2,"h":3,"i":"18", static: false},
        {"x":2,"y":6,"w":2,"h":2,"i":"19", static: false}
      ],
      draggable: true,
      resizable: true,
      index: 0,
      dayPeriod: 1,

      portfolioWeights: {
        pieSeries: [],

        pieOptions: {
          chart: {
            height: "400px",
            background: "rgb(21 25 38)",
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

      categoriesWeights:{
        pieSeries: [],

        pieOptions: {
          chart: {
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
            },
            background: "rgb(21 25 38)",
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
          data: [


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
      changeByPeriod: 0

    }
  },
  methods:{
    getReturnsPeriod(e){
      this.dayPeriod=e
      this.returnsByPeriod.series1[0].data=[]
      this.returnsByPeriod.chartOptions1.xaxis.categories=[]

      AnalysisService.getReturnsDays(this.dayPeriod).then(res=>{
      let labels = []
        Object.entries(res.data).forEach(obj=>{
          console.log(new Date(obj[0]))
          let a = this.dayPeriod === 1 ? new Date(obj[0]).getHours().toString()+":00" : new Date(obj[0]).getTime()
          console.log(this.returnsByPeriod.chartOptions1)
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
        console.log(this.returnsByPeriod.series1)

      })
    },
    getChangePeriod(e, type){
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

      AnalysisService.getChangePeriod(start, end).then(res=>{
        this.changeByPeriod = res.data.change
      })
    }
  },
  mounted(){
    AnalysisService.getCategoriesWeights().then(res=>{
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

    })
    AnalysisService.portfolioWeights().then(res=>{
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
    })

    this.getReturnsPeriod(this.dayPeriod)

    AnalysisService.avgReturns().then(res=>{
      this.avgReturns = res.data.avg_profit_loss
    })

    AnalysisService.winrate().then(res=>{
      this.winrate = res.data.winrate*100
    })
    this.getChangePeriod(null, "start")
  }
}
</script>

<style scoped>
.q-field__native{
  color: white!important;
}
</style>
