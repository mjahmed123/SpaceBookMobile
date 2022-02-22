import axios from 'axios';
import { rootStore } from '../stores/RootStore';
import config from '../config';

const { API_URL } = config;

export function createPost(userId, text) {
  return axios.post(`${API_URL}/user/${userId}/post`, { text }, {
    headers: {
      'X-Authorization': rootStore.account.token,
    },
  })
    .then((result) => result.data);
}
export function getPosts(userId) {
  return axios.get(`${API_URL}/user/${userId}/post`, {
    headers: {
      'X-Authorization': rootStore.account.token,
    },
  })
    .then((result) => result.data);
}
