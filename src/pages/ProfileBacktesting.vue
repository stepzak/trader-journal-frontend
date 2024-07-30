<template>
  <q-page style="margin-top: 1px; margin-bottom: -1px">
    <div class = "margin-navbar align-center">
      <h4 class="q-mt-md">
        Бэктэстинг стратегий
      </h4>
      <q-form class="column w-90 q-ml-md" style="gap: .5rem">
        <q-input label="Название стратегии" v-model="strategy.strategyName" style="width: 100%" outlined label-color="white" input-class="text-white" :rules="[value => {value && String(value).length>0 || 'Поле должно быть заполнено'}]"></q-input>
        <q-input label="Начальная сумма($)" v-model="strategy.cash" style="width: 100%" outlined label-color="white" input-class="text-white" :rules="[value => {value && String(value).length>0 || 'Поле должно быть заполнено'}]"></q-input>
        <q-select dark behavior="menu" label = "Позиция" v-model="strategy.position" :options="positions" outlined label-color="white" input-class="text-white">
        </q-select>
        <q-input label="Комиссия(в долях)" v-model="strategy.commission" style="width: 100%" outlined label-color="white" input-class="text-white" :rules="[value => {value && String(value).length>0 || 'Поле должно быть заполнено'}]"></q-input>

        <q-select dark behavior="menu" label = "Кредитое плечо" v-model="strategy.margin" :options="leverage" outlined label-color="white" input-class="text-white" />
        <q-input label="Take Profit(в долях)" v-model="strategy.tp" style="width: 100%" outlined label-color="white" input-class="text-white" :rules="[value => {value && String(value).length>0 || 'Поле должно быть заполнено'}]" />
        <q-input label="Stop Loss(в долях)" v-model="strategy.sl" style="width: 100%" outlined label-color="white" input-class="text-white" :rules="[value => {value && String(value).length>0 || 'Поле должно быть заполнено'}]" />
        <q-input label="Объем покупки(в долях)" v-model="strategy.buy_size" style="width: 100%" outlined label-color="white" input-class="text-white" :rules="[value => {value && String(value).length>0 || 'Поле должно быть заполнено'}]" />
        <q-input label="Объем продажи(в долях)" v-model="strategy.sell_size" style="width: 100%" outlined label-color="white" input-class="text-white" :rules="[value => {value && String(value).length>0 || 'Поле должно быть заполнено'}]" />
        <q-input label="Таймфрейм" v-model="strategy.timeframe" style="width: 100%" outlined label-color="white" input-class="text-white" :rules="[value => {value && String(value).length>0 || 'Поле должно быть заполнено'}]">
          <template #append>
            <q-icon name="help" color="primary">
              <q-tooltip style="font-size: small">
                Формат - {число}{буква}<br>
                Пример - 1d<br>
                s - секунда, m - минута, h - час, d - день, M - месяц, y - год
              </q-tooltip>
            </q-icon>
          </template>
        </q-input>
        <q-input type="date" label="Дата начала" v-model="strategy.startDate" style="width: 100%" outlined label-color="white" input-class="text-white" :rules="[value => {value && String(value).length>0 || 'Поле должно быть заполнено'}]"/>
        <q-input type="date" label="Дата конца" v-model="strategy.endDate" style="width: 100%" outlined label-color="white" input-class="text-white" :rules="[value => {value && String(value).length>0 || 'Поле должно быть заполнено'}]"/>
        <q-input label="Сигнал для покупки" v-model="strategy.buy_signal" style="width: 100%" outlined label-color="white" input-class="text-white" :rules="[value => {value && String(value).length>0 || 'Поле должно быть заполнено'}]">
          <template #append>
            <q-icon name="help" color="primary">
          <q-tooltip style="font-size: small">
            Сигнал для покупки - числовое значение, которое должна превзойти сумма всех сигналов(см. сигналы)
          </q-tooltip>
            </q-icon>
          </template>
        </q-input>
        <q-input label="Сигнал для продажи" v-model="strategy.sell_signal" style="width: 100%" outlined label-color="white" input-class="text-white" :rules="[value => {value && String(value).length>0 || 'Поле должно быть заполнено'}]">
          <template #append>
            <q-icon name="help" color="primary">
          <q-tooltip style="font-size: small">
            Сигнал для продажи - числовое значение, которое не должна должна превзойти сумма всех сигналов(см. сигналы)
          </q-tooltip>
            </q-icon>
          </template>
        </q-input>
        <q-btn color="secondary" label="Сигналы" @click="showDialog=true" class="w-fit q-mb-sm" text-color="black"></q-btn>
        <q-dialog v-model="showDialog" ref="dialogOptions">
          <q-card class="q-pa-md bg-secondary-color column" style="gap: .5rem; width: 90vw; height: 90vh">
            <div class="flex w-100 align-center justify-between" style="gap: .5rem" v-for="item in strategy.indicators">
              <q-expansion-item  :label="optionsIndicators.filter(obj=>{return obj.value=== item.indicator})[0].name" style="width: fit-content; min-width: 100%" class="border-white q-pa-sm w-100">
                <div v-if="item.indicator === 'rsi'" class="column gap-md">
                  <q-input hint="Оптимальное значение - 14" dark type="number" outlined label-color="white" input-class="text-white" :rules="[value => {value && String(value).length>0 || 'Поле должно быть заполнено'}]" label="Период, за который берется RSI" v-model="item.kwargs.period"/>
                  <q-input placeholder="70" type="number" outlined label-color="white" input-class="text-white" :rules="[value => {value && String(value).length>0 || 'Поле должно быть заполнено'}]" label="Покупать, если RSI больше" v-model="item.kwargs.buy_rsi"/>
                  <q-input placeholder="30" type="number" outlined label-color="white" input-class="text-white" :rules="[value => {value && String(value).length>0 || 'Поле должно быть заполнено'}]" label="Продавать, если RSI меньше" v-model="item.kwargs.sell_rsi"/>

                </div>

                <div v-else-if="item.indicator === 'sma'" class="column gap-md">
                  <q-input placeholder="10" dark type="number" outlined label-color="white" input-class="text-white" :rules="[value => {value && String(value).length>0 || 'Поле должно быть заполнено'}]" label="Длина первой скользящей средней" v-model="item.kwargs.ma1_period"/>
                  <q-input placeholder="20" dark type="number" outlined label-color="white" input-class="text-white" :rules="[value => {value && String(value).length>0 || 'Поле должно быть заполнено'}]" label="Длина второй скользящей средней" v-model="item.kwargs.ma2_period"/>
                </div>

                <div v-else-if="['aroon', 'ema'].includes(item.indicator)" class="column gap-md">
                  <q-input placeholder="14" dark type="number" outlined label-color="white" input-class="text-white" :rules="[value => {value && String(value).length>0 || 'Поле должно быть заполнено'}]" label="Период" v-model="item.kwargs.period"/>
                </div>

                <q-input type="number" outlined label-color="white" input-class="text-white" :rules="[value => {value && String(value).length>0 || 'Поле должно быть заполнено'}]" label="Положительный сигнал(покупка)" v-model="item.positive_signal"/>
                <q-input type="number" outlined label-color="white" input-class="text-white" :rules="[value => {value && String(value).length>0 || 'Поле должно быть заполнено'}]" label="Отрицательный сигнал(продажа)" v-model="item.negative_signal"/>
                <q-btn color="negative" text-color="white" label="Удалить" @click="deleteItem(item)" icon-right="delete" class="q-mt-md"></q-btn>
              </q-expansion-item>
            </div>
            <div class="flex justify-center gap-lg">
              <q-btn-dropdown color="dark" icon="add" label="Добавить">
                  <q-list style="background: var(--bg-plot); color: white">
                    <q-item v-for="item in optionsIndicators.filter(obj=>{
                      return !(strategy.indicators.map(x=>{return x.indicator}).includes(obj.value))
                    })" clickable @click="strategy.indicators.push({'indicator': item.value, kwargs: {}, positive_signal: 2, negative_signal: -2})">
                      {{item.name}}
                    </q-item>

                  </q-list>
              </q-btn-dropdown>
              <q-btn color="primary" label="Сохранить и протестировать" icon="save" @click="backTest"></q-btn>
            </div>
          </q-card>
        </q-dialog>
      </q-form>
      <q-dialog v-model="showRes">
        <q-card class="q-pa-sm bg-secondary-color column" style="gap: .5rem; width: 90vw; height: 90vh" >
          <div class="text-h6">Капитал: {{results.equityFinal}} $</div>
          <div class="text-h6">Пиковое значение капитала: {{results.equityPeak}} $</div>
          <div class="text-h6">Доходность: {{results.return_}}%</div>
          <div class="text-h6">Волатильность: {{results.volatility}}%</div>
          <div class="text-h6">Кф Шарпа: {{results.sharpe}}</div>
          <div class="text-h6">Кф Сортино: {{results.sortino}}</div>
          <div class="text-h6">Кф Кальмара: {{results.calmar}}</div>
          <div class="text-h6">Максимальная просадка: {{results.maxDrowdown}}%</div>
          <div class="text-h6">Средняя просадка: {{results.avgDrowdown}}%</div>
          <div class="text-h6">Винрейт: {{results.winrate}}%</div>
          <div class="text-h6">Лучшая сделка: {{results.bestTrade}}%</div>
          <div class="text-h6">Худшая сделка: {{results.worstTrade}}%</div>
          <q-btn color="primary" label="Скачать график" @click="getPlot"></q-btn>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import BacktestingService from "src/services/backtesting.service";

export default {
  name: "ProfileBacktesting",
  data(){
    return {
      showDialog: false,
      optionsIndicators: [
        {name: "RSI", value: "rsi"},
        {name: "AROON", value: "aroon"},
        {name: "MACD", value: "macd"},
        {name: "SMA Crossover", value: "sma"},
        {name: "EMA", value: "ema"},
        {name: "3 черные вороны", value: "cdl3blackcrows"},
      ],
      strategy: {
        strategyName: "Стратегия 1",
        cash: 10000,
        position: "ETH-USD",
        commission: 0.0007,
        margin: "1/10",
        indicators: [],
        tp: 0.02,
        sl: 0.02,
        buy_size: 0.02,
        sell_size: 0.02,
        timeframe: "1d",
        startDate: "2013-07-21",
        endDate: "2024-07-21",
        buy_signal: 0.1,
        sell_signal: 0.1
      },
      positions: [],
      leverage:[
        "1/5",
        "1/10",
        "1/25",
        "1/50",
        "1/100",
      ],
      results: {},
      showRes: false

    }
  },
  async mounted(){
    await BacktestingService.getPositions().then(res=>{
      console.log(res.data)
      this.positions=res.data
    })
  },
  methods:{
    deleteItem(item){
      let index = this.strategy.indicators.indexOf(item)
      this.strategy.indicators.splice(index, 1)
    },
    addIndicator(indicator){
      let logical_enum = {
        rsi: [
          {"signal": 2,
            def: true,
            "signal_false": 0,
            "expressions": [
              {"tie_to": "number", "expression": ">=", "value": 70}
            ]
          },
          {
            def: true,
            "signal": -2,
            "expressions": [{"tie_to": "number", "expression": "<=", "value": 30}]
          },
        ],

      }
    },
    async backTest(){
      let data = this.strategy
      data.margin = eval(data.margin)
      await BacktestingService.backtest(data).then(res=>{
        this.showRes=true
        this.results=res.data
      })
    },
    async getPlot(){
      await BacktestingService.getPlot(this.results.guid).then(res=>{
        var a = document.createElement("a"); //Create <a>
        a.href = "data:application/html;base64," + res.data.base64; //Image Base64 Goes here
        a.download = res.data.filename; //File name Here
        a.click(); //Downloaded file

      })
    }
  }
}
</script>

<style>

</style>
