export default function authHead(key){
  return {"Authorization": "Bearer "+localStorage.getItem(key)}
}
