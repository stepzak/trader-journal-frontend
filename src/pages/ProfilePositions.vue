<template>
<q-page class="q-pa-lg flex justify-center" style=" margin-bottom: var(--footer-height);">
  <q-table class="margin-navbar " table-style ="min-height: 100%" dark :columns="columns" :rows="positions" style="width:100%;">
      <template #body="props">
        <q-tr :props="props">
          <q-td key="symbol" :props="props">
            {{props.row.symbol}}
          </q-td>
          <q-td key="availableAmt" :props="props">
            {{props.row.availableAmt}}
          </q-td>
          <q-td key="markPrice" :props="props">
            {{props.row.markPrice}}
          </q-td>
          <q-td key="realisedProfit" :props="props">
            <div :class="props.row.realisedProfit < 0 ? ' text-negative ' : ' text-positive '">{{props.row.realisedProfit}} USDT</div>
          </q-td>
        </q-tr>
      </template>
  </q-table>
  <!---<Calendar theme="dark" dark isDark>
    <template v-slot:day-content="obj">
      <div class="text-center text-negative q-ml-auto bg-secondary-color" style="min-width: 100px">
        {{obj.day.label}}
      </div>

    </template>
  </Calendar>-->

</q-page>
</template>

<script>
import AnalysisService from "src/services/analysis.service";

export default {
  name: "ProfilePositions",
  components: {},
  data() {
    return {
      columns: [
        {name: "symbol", align: 'center', label: 'Символ', field: 'symbol',},
        {name: "availableAmt", align: 'center', label: 'Кол-во', field: 'availableAmt', sortable: true},
        {name: "markPrice", align: 'center', label: 'Цена(за ед.)', field: 'markPrice', sortable: true},
        {name: "realisedProfit", align: 'center', label: 'Прибыль/убытки', field: 'realisedProfit', sortable: true},
      ],
      positions: [],
      profits: {}
    }
  },
  async mounted(){
    await AnalysisService.getPositions().then(res=>{
      this.positions=res.data
    })



  }
}
</script>

<style>

.bg-calendar{
  background: var(--vc-bg);
}

body{
  --vc-header-title-color: black
}
.vc-container .vc-nav-title .vc-title .vc-header{
 color: black!important;
}

.vc-dark{
  --vc-header-arrow-color: black;
  --vc-nav-title-color: black
}

.border-table{
  border: 1px solid rgba(255, 255, 255, 0.28);
}
.on-left .on-right{
  margin: 0
}
</style>
