import AccountStore from './Account';

export class RootStore {
  constructor() {
    this.account = new AccountStore(this);
  }
}

export const rootStore = new RootStore();
