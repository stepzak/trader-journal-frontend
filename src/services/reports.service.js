import {api} from "boot/axios";
import authHead from "src/services/authHeader";

class ReportsService{
  static async generateRepost(daysOffset){
    return await api.get("/reports/", {params: {day_offset: daysOffset}, headers: authHead("access_token")}).then(res=>{
      return Promise.resolve(res)
    })
  }

  static async getAll(){
    return await api.get("/reports/all", {headers: authHead("access_token")}).then(res=>{
      return Promise.resolve(res)
    })
  }
}

export default ReportsService
