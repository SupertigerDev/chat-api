import { makeAutoObservable } from 'mobx';
import { Client } from '../common/Client';


interface UserData {
  _id: string;
  username: string;
  tag: string;
  hexColor: string;
}

export class User {
  
  client: Client;

  _id: string;
  
  username: string;

  tag: string;

  hexColor: string;

  constructor(client: Client, userData: UserData) {
    this.client = client;
    makeAutoObservable(this, { client: false });
    
    this._id = userData._id;
    this.username = userData.username;
    this.tag = userData.tag;
    this.hexColor = userData.hexColor;
  }
}