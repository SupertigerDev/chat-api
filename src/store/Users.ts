import { makeAutoObservable } from 'mobx';
import { Client } from '../common/Client';


interface UserData {
  _id: string;
  username: string;
  tag: string;
  hexColor: string;
}

enum UserStatus {
  OFFLINE = 0,
  ONLINE = 1,
  LTP = 2, // Looking To Play
  AFK = 3, // Away from keyboard
  DND = 4, // Do not disturb
}

interface Presence {
  custom?: string;
  status: UserStatus;
}

export class User {
  
  client: Client;

  _id: string;
  
  username: string;

  tag: string;

  hexColor: string;

  presence: Presence;

  constructor(client: Client, userData: UserData) {
    this.client = client;
    this.presence = { status: UserStatus.OFFLINE };
    makeAutoObservable(this, { client: false });
    
    this._id = userData._id;
    this.username = userData.username;
    this.tag = userData.tag;
    this.hexColor = userData.hexColor;
  }
  setPresence(presence: Presence, locally = false) {
    if (locally) {
      this.presence = presence;
      if (presence.status === UserStatus.OFFLINE) {
        delete presence.custom;
      }
    }
  }
}


export class Users {

  client: Client;

  cache: Record<string, User> = {};

  addUser(data: UserData) {
    const user = new User(this.client, data);
    this.cache[data._id] = user;
    return user;
  }

  constructor(client: Client) {
    this.client = client;
    makeAutoObservable(this, { client: false });
  }

  get array() {
    return Object.values(this.cache);
  }
}