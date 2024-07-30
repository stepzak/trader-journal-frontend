export default function authHead(key = "access_token"){
  return {"Authorization": "Bearer "+localStorage.getItem(key)}
}
