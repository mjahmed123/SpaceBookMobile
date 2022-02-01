import axios from 'axios';


export function addAccount({first_name, last_name, email, password}) {
  return axios.post("http://localhost:3333/user", {
    first_name,
    last_name,
    email,
    password
  })
}

