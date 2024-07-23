import {api} from "boot/axios";
import authHead from "src/services/authHeader";

class AnalysisService{
  static async portfolioWeights(){
    return await api.get("/analysis/portfolio_weights", {headers: authHead("access_token")}).then(res=>{
      return Promise.resolve(res)
    })
  }

  static async getReturnsDays(days, freq = "auto"){
    return await api.get("/analysis/profit_plot", {headers: authHead("access_token"), params: {days_offset: days, frequency: freq}}).then(res=>{
      return Promise.resolve(res)
    })
  }

  static async getCategoriesWeights(){
    return await api.get("/analysis/weights_categories", {headers: authHead("access_token")}).then(res=>{
      return Promise.resolve(res)
    })
  }

  static async avgReturns(){
    return await api.get("/analysis/avg_profit_loss", {headers: authHead("access_token")}).then(res=>{
      return Promise.resolve(res)
    })
  }

  static async winrate(){
    return await api.get("/analysis/winrate", {headers: authHead("access_token")}).then(res=>{
      return Promise.resolve(res)
    })
  }

  static async getChangePeriod(startTime, endTime){
    return await api.get("/analysis/change_by_period", {headers: authHead("access_token"), params: {endTime: endTime, startTime: startTime}}).then(res=>{
      return Promise.resolve(res)
    })
  }

  static async getSharpe(){
    return await api.get("/analysis/sharpe", {headers: authHead("access_token")}).then(res=>{
      return Promise.resolve(res)
    })
  }

  static async getAlphaBeta(){
    return await api.get("/analysis/alpha_and_beta", {headers: authHead("access_token")}).then(res=>{
      return Promise.resolve(res)
    })
  }

  static  async getVolatility(){
    return await api.get("/analysis/volatility", {headers: authHead("access_token")}).then(res=>{
      return Promise.resolve(res)
    })
  }

  static async getVar(trust){
    return await api.get("/analysis/calculate_var", {headers: authHead("access_token"), params: {trust: trust}}).then(res=>{
      return Promise.resolve(res)
    })
  }

  static async getPositions(){
    return await api.get("/analysis/positions", {headers: authHead("access_token")}).then(res=>{
      return Promise.resolve(res)
    })
  }

  static async getDeals(startTime, endTime){
    return await api.get("/analysis/deals", {headers: authHead("access_token"), params: {endTime: endTime, startTime: startTime}}).then(res=>{
      return Promise.resolve(res)
    })
  }

  static async getProfitFactor(){
    return await api.get("/analysis/profit_factor", {headers: authHead("access_token")}).then(res=>{
      return Promise.resolve(res)
    })
  }

  static async dealsCount(){
    return await api.get("/analysis/deals_count", {headers: authHead("access_token")}).then(res=>{
      return Promise.resolve(res)
    })
  }

  static async avgDealReturns(){
    return await api.get("/analysis/avg_deal_profit", {headers: authHead("access_token")}).then(res=>{
      return Promise.resolve(res)
    })
  }

  static async getStdMeanLoss(){
    return await api.get("/analysis/std_mean_loss", {headers: authHead("access_token")}).then(res=>{
      return Promise.resolve(res)
    })
  }

}


export default AnalysisService;
