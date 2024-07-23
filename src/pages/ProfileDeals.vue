<template>
  <q-page class="q-pa-lg flex justify-center" style=" margin-bottom: var(--footer-height);">
    <div class="margin-navbar">
      <div class="q-mb-md">
        <q-btn color="dark" :label="showFilter ? 'Скрыть фильтры': 'Показать фильтры'" @click="showFilter = !showFilter" icon="filter_alt"></q-btn>
        <div class="bg-dark q-pa-lg flex" v-if="showFilter" style="gap: 1rem; border: 1px solid rgba(255, 255, 255, 0.28);">
        <q-input readonly outlined label-color="white" input-class="text-white" label="Временной период" v-model="timeStr"  style="width: 25%" clearable @clear="updateDate({to: null, from: null})">
          <template v-slot:prepend>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date range v-model="timePeriod" @update:model-value="val => updateDate(val)" dark>
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
          <template #append>
            <q-icon name="cancel" class="cursor-pointer" @click="updateDate({to: null, from: null})"></q-icon>
          </template>
        </q-input>
          <q-select :options="allowedStatuses" v-model="statuses" multiple style="min-width: 25%" label="Статус" dark @update:model-value="val =>{updateStatuses(val)}">

          </q-select>
          <q-select :options="allowedSide" v-model="side" multiple label="Сторона" style="min-width: 20%" dark @update:model-value="val =>{updateSide(val)}">

          </q-select>
          <q-select :options="allowedPositionSide" v-model="positionSide" multiple style="min-width: 20%" label="Сторона позиции" dark @update:model-value="val =>{updatePositionSide(val)}">

          </q-select>
          <q-select :options="allowedSymbols" v-model="symbols" multiple label="Позиция" dark @update:model-value="val =>{updateSymbol(val)}" style="min-width: 25%" input-style="min-width: fit-content">

          </q-select>
        </div>
      </div>
    <q-table :rows-per-page-options="[15, 20, 25, 30, 35, 40, 45, 50, 0]" class="w-100 " table-style ="min-height: 100%" dark :columns="columns" :rows="dealsFiltered" virtual-scroll style="width:100%; height: calc(90vh - 2* var(--scroll-margin) - 40px - 1.5* var(--footer-height)); margin-bottom: calc(var(--footer-height)+ 10px)">
      <template #body="props">
        <q-tr :props="props">
          <q-td :props="props" v-for="item in columns.map(x=>{return x.field})" :key="item">
            <span v-if="item !== 'time'">{{props.row[item]}}</span>
            <div v-else>{{new Date(props.row.time).toDateString()}}</div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    </div>
  </q-page>
</template>

<script>
import AnalysisService from "src/services/analysis.service";

export default {
  name: "ProfileDeals",
  data(){
    return {
      columns: [
        {name: "symbol", align: 'center', label: 'Позиция', field: 'symbol',},
        {name: "side", align: 'center', label: 'Сторона', field: 'side',},
        {name: "positionSide", align: 'center', label: 'Сторона позиции', field: 'positionSide',},
        {name: "status", align: 'center', label: 'Статус', field: 'status',},
        {name: "origQty", align: 'center', label: 'Изначальное кол-во', field: 'origQty', sortable: true},
        {name: "executedQty", align: 'center', label: 'Реализованное кол-во', field: 'executedQty', sortable: true},
        {name: "price", align: 'center', label: 'Цена', field: 'price', sortable: true},
        {name: "profit", align: 'center', label: 'Прибыль/убытки', field: 'profit', sortable: true},
        {name: "time", align: 'center', label: 'Дата создания сделки', field: 'time',},
        {name: "leverage", align: 'center', label: 'Лэвэридж', field: 'leverage',},
      ],
      deals: [],
      dealsFiltered: [],
      timePeriod: {from: null, to:null},
      proxyDate: {from: null, to: null},
      showFilter: false,
      timeStr: "",
      allowedStatuses: [],
      statuses: [],
      side: [],
      allowedSide: [],
      positionSide: [],
      allowedPositionSide: [],
      symbols: [],
      allowedSymbols: []
    }
  },
  async mounted(){
    await AnalysisService.getDeals(0, null).then(res=>{
      this.deals = this.dealsFiltered = res.data
      this.statuses = this.allowedStatuses =  Array.from(new Set([...res.data.map(x=>{return x.status})]))
      this.side = this.allowedSide =  Array.from(new Set([...res.data.map(x=>{return x.side})]))
      this.positionSide = this.allowedPositionSide =  Array.from(new Set([...res.data.map(x=>{return x.positionSide})]))
      this.symbols = this.allowedSymbols =  Array.from(new Set(["Все",...res.data.map(x=>{return x.symbol})]))
      this.symbols=["Все"]
    })
  },
  methods:{
    updateFilters(){

      let timeFrom = new Date()
      let timeTo = timeFrom
      if(this.timePeriod.from){
        timeFrom = new Date(this.timePeriod.from)
        timeTo = new Date(this.timePeriod.to)
      }


      this.dealsFiltered = this.deals.filter(obj=>{
        return (timeTo === timeFrom || (timeFrom.getTime()<=obj.time && obj.time<=timeTo.getTime())) && this.statuses.includes(obj.status) && this.side.includes(obj.side)
        && this.positionSide.includes(obj.positionSide) && (this.symbols.includes(obj.symbol) || this.symbols.includes("Все"))

      })

    },
    updateDate(val){
      console.log(this.timeStr)
      console.log()

      this.timePeriod=val
      if(this.timePeriod.to) {
        this.timeStr = this.timePeriod.from + '-' + this.timePeriod.to
      }
      else{
        this.timeStr=''
      }
      console.log(this.timeStr)
      this.updateFilters()
    },
    updateStatuses(val){
      this.statuses=val
      this.updateFilters()
    },
    updateSide(val){
      this.side=val
      this.updateFilters()
    },
    updatePositionSide(val){
      this.positionSide=val
      this.updateFilters()
    },
    updateSymbol(val){
      this.symbols=val
      this.updateFilters()
    }
  }
}
</script>

<style scoped>

</style>
