import { makeAutoObservable, runInAction } from 'mobx';
import { Client } from '../common/Client';
import { openDMChannelRequest } from '../services/users';
import { Inbox } from './Inbox';


interface UserData {
  _id: string;
  username: string;
  tag: string;
  hexColor: string;
}

export enum UserStatus {
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
  inboxChannelId?: string;

  constructor(client: Client, userData: UserData) {
    this.client = client;
    this.presence = { status: UserStatus.OFFLINE };
    makeAutoObservable(this, { client: false });
    
    this._id = userData._id;
    this.username = userData.username;
    this.tag = userData.tag;
    this.hexColor = userData.hexColor;
  }
  _setInboxChannelId(inboxChannelId: string) {
    this.inboxChannelId = inboxChannelId;
  }
  setPresence(presence: Presence, locally = false) {
    if (locally) {
      this.presence = presence;
      if (presence.status === UserStatus.OFFLINE) {
        delete presence.custom;
      }
    }
  }

  async openDM() {
    const rawInbox = await openDMChannelRequest(this.client, this._id);
    return runInAction(() => {
      this.client.channels._addChannel(rawInbox.channel);
      const inbox = this.client.inbox.add({channel: rawInbox.channel._id});
      return inbox;
    });
  }

  get inbox() {
    if (this.inboxChannelId) {
      return this.client.inbox.cache[this.inboxChannelId];
    }
  }
}


export class Users {

  client: Client;

  cache: Record<string, User> = {};

  _addUser(data: UserData) {
    if (this.cache[data._id]) return this.cache[data._id];
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