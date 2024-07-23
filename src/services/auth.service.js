import {api} from "boot/axios";
import authHead from "src/services/authHeader";

class AuthService{
  static login(data){
    return api.post("/auth/login", data).then(res=>{
      return Promise.resolve(res)
    }).catch(e=>{
      console.log(e)
      return Promise.reject(e)
    })
  }

  static register(data){
    return api.post("/auth/register", data).then(res=>{
      return Promise.resolve(res)
    })
  }

  static getUser(){
    return api.get("/auth/profile", {headers: authHead("access_token")}).then(res=>{
      return Promise.resolve(res)
    })
  }

  static resetPassword(email){
    return api.post("/auth/reset_password", {}, {params: {mail: email}}).then(res=>{
      return Promise.resolve(res)
    })
  }

  static checkCode(email, code){
    return api.post("/auth/check_code", {}, {params: {mail: email, code: code}}).then(res=>{
      return Promise.resolve(res)
    })
  }

  static changePassword(factor, new_pass){
    return api.put("/auth/change_password", {}, {params: {factor: factor, new_password: new_pass}}).then(res=>{
      return Promise.resolve(res)
    })
  }

}

export default AuthService;
