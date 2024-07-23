import VueApexCharts from 'vue3-apexcharts'
import {boot} from "quasar/wrappers";
// Use plugin with optional defaults

export default boot( async({ app }) => {
  //app.use(VueApexCharts)
  app.component('apexchart', VueApexCharts)
}
)
