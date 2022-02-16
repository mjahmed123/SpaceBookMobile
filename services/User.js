import axios from 'axios';
import { rootStore } from '../stores/RootStore';

export const API_URL = 'http://localhost:3333/api/1.0.0';

// returns {id}
export function addAccount({
  firstName, lastName, email, password,
}) {
  return axios.post(`${API_URL}/user`, {
    first_name: firstName,
    last_name: lastName,
    email,
    password,
  })
    .then((result) => result.data);
}

// returns {id, token}
export function login({ email, password }) {
  return axios.post(`${API_URL}/login`, {
    email,
    password,
  })
    .then((result) => result.data);
}

export function getUserById(id) {
  return axios.get(`${API_URL}/user/${id}`, {
    headers: {
      'X-Authorization': rootStore.account.token,
    },
  })
    .then((result) => result.data);
}

export function getUserPhotoById(id) {
  return axios.get(`${API_URL}/user/${id}/photo`, {
    responseType: 'arraybuffer',
    headers: {
      'X-Authorization': rootStore.account.token,
    },
  })
    .then((result) => Buffer.from(result.data, 'binary').toString('base64'));
}
export function getFriends(userId = rootStore.account.userId) {
  return axios.get(`${API_URL}/user/${userId}/friends`, {
    headers: {
      'X-Authorization': rootStore.account.token,
    },
  })
    .then((result) => result.data);
}

export async function isFriendsWithUser(friendUserId) {
  const myFriends = await getFriends();
  return !!myFriends.find((friend) => friend.user_id === friendUserId);
}

export function getFriendRequests() {
  return axios.get(`${API_URL}/friendrequests`, {
    headers: {
      'X-Authorization': rootStore.account.token,
    },
  })
    .then((result) => result.data);
}
export function sendRequest(userId) {
  return axios.post(`${API_URL}/user/${userId}/friends`, {}, {
    headers: {
      'X-Authorization': rootStore.account.token,
    },
  })
    .then((result) => result.data);
}
export function acceptRequest(userId) {
  return axios.post(`${API_URL}/friendrequests/${userId}`, {}, {
    headers: {
      'X-Authorization': rootStore.account.token,
    },
  })
    .then((result) => result.data);
}
export function declineRequest(userId) {
  return axios.delete(`${API_URL}/friendrequests/${userId}`, {
    headers: {
      'X-Authorization': rootStore.account.token,
    },
  })
    .then((result) => result.data);
}

// query: search value
// searchIn: friends, all
// limit: number of items to return
// offset: skip items
export function searchUsers({
  query, searchIn, limit, offset,
}) {
  return axios.get(`${API_URL}/search`, {
    params: {
      q: query,
      search_in: searchIn,
      limit,
      offset,
    },
    headers: {
      'X-Authorization': rootStore.account.token,
    },
  })
    .then((result) => result.data);
}
