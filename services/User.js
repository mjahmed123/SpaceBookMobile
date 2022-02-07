import axios from 'axios';
import { rootStore } from '../stores/RootStore';
export const API_URL = "http://localhost:3333/api/1.0.0"

// returns {id}
export function addAccount({first_name, last_name, email, password}) {
  return axios.post(API_URL + "/user", {
    first_name,
    last_name,
    email,
    password
  })
  .then(result => result.data)
}

// returns {id, token}
export function login({email, password}) {
  return axios.post(API_URL + "/login", {
    email,
    password
  })
  .then(result => result.data)
}

export function getUserById(id) { 
  return axios.get(API_URL + "/user/" + id, {
    headers: {
      "X-Authorization": rootStore.account.token
    }
  })
  .then(result => result.data)
}
export function getUserPhotoById(id) { 
  return axios.get(API_URL + "/user/" + id + "/photo", {
    responseType: 'arraybuffer',
    headers: {
      "X-Authorization": rootStore.account.token
    }
  })
  .then(result => Buffer.from(result.data, 'binary').toString('base64'))
}