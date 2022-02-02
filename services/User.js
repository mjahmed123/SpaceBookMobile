import axios from 'axios';

const API_URL = "http://localhost:3333/api/1.0.0"

// returns {id}
export function addAccount({first_name, last_name, email, password}) {
  return axios.post(API_URL + "/user", {
    first_name,
    last_name,
    email,
    password
  })
}

// returns {id, token}
export function login({email, password}) {
  return axios.post(API_URL + "/login", {
    email,
    password
  })
}

