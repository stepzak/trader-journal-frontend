import {api} from "boot/axios";
import authHead from "src/services/authHeader";

class BoardsService{
  static async getBoards(){
    return await api.get("/boards/", {headers: authHead("access_token")}).then(res=>{
      return Promise.resolve(res)
    })
  }

  static addBoard(data){
    return api.post("/boards/", data, {headers: authHead("access_token")}).then(res=>{
      return Promise.resolve(res)
    })
  }

  static updateBoard(boardId, data){
    return api.put(`/boards/${boardId}`, data, {headers: authHead("access_token")}).then(res=>{
      return Promise.resolve(res)
    })
  }

  static addWidget(boardId, widget){
    return api.post(`/boards/add_widget`, widget, {headers: authHead("access_token"), params: {board_id: boardId}}).then(res=>{
      return Promise.resolve(res)
    })
  }

  static removeWidget(boardId, widgetId){
    return api.delete(`/boards/${boardId}/${widgetId}`, {headers: authHead("access_token")}).then(res=>{
      return Promise.resolve(res)
    })
  }

}

export default BoardsService;
