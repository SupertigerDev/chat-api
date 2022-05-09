import { makeAutoObservable } from 'mobx';
import { Client } from '../common/Client';
import { User } from './Users';

export class Account {

  client: Client;

  user: User | null;

  constructor(client: Client) {
    this.client = client;
    this.user = null;
    makeAutoObservable(this, { client: false });
  }
  setUser(user: User) {
    this.user = user;
  }
}