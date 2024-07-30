<template>
  <q-page>
    <div class="margin-navbar flex gap-md q-pa-md">
      <q-btn-dropdown label="Новый отчет" dark>
        <q-list dark class="bg-dark text-white">
          <q-item clickable @click="newReport(365)">
            Год
          </q-item>
          <q-item clickable @click="newReport(30)">
            Месяц
          </q-item>
          <q-item clickable @click="newReport(7)">
            Неделя
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </div>
    <div class="q-mt-md flex gap-lg q-pa-md">
      <q-item v-for = "item in reports" @click="selectedReport=item; showModal = true" clickable class="bg-dark q-pa-sm flex align-center">
        Отчет за {{String(item.created_at).split("T")[0]}}({{daysEnum[item.day_period]}})
      </q-item>
    </div>

    <q-dialog v-model="showModal">
      <q-card class="bg-secondary-color text-white q-pa-lg">
        <q-card-section>
          <h4 style="margin-top: .5rem; margin-bottom: .5rem">Отчет за {{String(selectedReport.created_at).split("T")[0]}}({{daysEnum[selectedReport.day_period]}})</h4>
        </q-card-section>
        <q-splitter></q-splitter>
        <q-card-section>
          {{selectedReport.intro}}
        </q-card-section>
        <q-splitter></q-splitter>
        <q-card-section>
          <div>Прибыль: {{selectedReport.profit}} USDT</div>
          <div>VAR: {{selectedReport.var}} USDT</div>
          <div>Кф Шарпа: {{selectedReport.sharpe}}</div>
          <div>Альфа: {{selectedReport.alpha}}</div>
          <div>Бета: {{selectedReport.beta}}</div>
        </q-card-section>
        <q-splitter></q-splitter>
        <q-card-section>
          {{selectedReport.conclusion}}
        </q-card-section>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script>
import ReportsService from "src/services/reports.service";

export default {
  name: "ProfileReports",
  data(){
    return {
      reports: [],
      showModal: false,
      selectedReport: {},
      daysEnum: {
        7: "неделя",
        30: "месяц",
        365: "год"
      }
    }
  },
  methods:{
    async newReport(dayOffset){
        await ReportsService.generateRepost(dayOffset).then(res=>{
          this.reports = res.data
          ReportsService.getAll().then(res1=>{
            this.reports = res1.data
          })
        })
    }
  },
  async mounted(){
    await ReportsService.getAll().then(res=>{
      this.reports = res.data
    })
  }
}
</script>

<style scoped>

</style>
