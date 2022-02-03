import { makeAutoObservable } from "mobx";
import {setToken as setStorageToken } from '../utils/token'

export class AccountStore {

  token = null;

  constructor(rootStore) {
    makeAutoObservable(this, { rootStore: false })
    this.rootStore = rootStore
  }
  
  setToken(token, setStorage = true) {
    this.token = token;
    if (!setStorage) return;
    setStorageToken(token)
  }

}