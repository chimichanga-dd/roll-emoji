import axios from 'axios'

let rollApi = axios.create({
  baseURL: "/",
})

export {
  rollApi
}