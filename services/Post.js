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

export function editPost(userId, postId, text) {
  return axios.patch(`${API_URL}/user/${userId}/post/${postId}`, { text }, {
    headers: {
      'X-Authorization': rootStore.account.token,
    },
  })
    .then((result) => result.data);
}

export function getPosts(userId, { limit, offset }) {
  return axios.get(`${API_URL}/user/${userId}/post`, {
    params: {
      limit,
      offset,
    },
    headers: {
      'X-Authorization': rootStore.account.token,
    },
  })
    .then((result) => result.data);
}

export function deletePost(userId, postId) {
  return axios.delete(`${API_URL}/user/${userId}/post/${postId}`, {
    headers: {
      'X-Authorization': rootStore.account.token,
    },
  })
    .then((result) => result.data);
}
export function likePost(userId, postId) {
  return axios.post(`${API_URL}/user/${userId}/post/${postId}/like`, {}, {
    headers: {
      'X-Authorization': rootStore.account.token,
    },
  })
    .then((result) => result.data);
}
export function unlikePost(userId, postId) {
  return axios.delete(`${API_URL}/user/${userId}/post/${postId}/like`, {
    headers: {
      'X-Authorization': rootStore.account.token,
    },
  })
    .then((result) => result.data);
}
