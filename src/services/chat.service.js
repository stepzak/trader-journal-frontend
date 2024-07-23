import {api} from "boot/axios";
import authHead from "src/services/authHeader";

class ChatService {
  static getMessages(){
    return api.get("/chat", {headers: authHead("access_key")}).then(res=>{
      return Promise.resolve(res)
    })
  }
}

export default ChatService
