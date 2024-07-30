import authHead from "src/services/authHeader";
import {api} from "boot/axios";

class BacktestingService{
  static async getPositions(){
    return await api.get("/backtesting/available_positions_list", {headers: authHead()}).then(res=>{
      return Promise.resolve(res)
    })
  }

  static async backtest(data){
    return await api.post("/backtesting/backtest", data, {headers: authHead()}).then(res=>{
      return Promise.resolve(res)
    })
  }

  static async getPlot(guid){
    return await api.get("/backtesting/get_plot_file_base64", {headers: authHead(), params: {guid: guid}}).then(res=>{
      return Promise.resolve(res)
    })
  }

}


export default BacktestingService;
