import { makeAutoObservable } from 'mobx';
import { setToken as setStorageToken, setUserId as setStorageUserId } from '../utils/localStore';

export default class AccountStore {
  token = null;

  userId = null;

  constructor(rootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
  }

  setLoggedInDetails(token, userId, setStorage = true) {
    this.token = token;
    this.userId = userId;
    if (!setStorage) return;
    setStorageToken(token);
    setStorageUserId(userId);
  }
}
