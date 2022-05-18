import { makeAutoObservable } from 'mobx';
import { Client } from '../common/Client';
import { RawFriend } from '../types/RawData';

export enum FriendStatus {
  SENT = 0,
  PENDING = 1,
  FRIENDS = 2,
}


export class Friend {

  client: Client;
  
  status: FriendStatus;
  userId: string;

  constructor(client: Client, data: RawFriend) {
    this.client = client;
    this.status = data.status;
    this.userId = data.recipient._id;
    makeAutoObservable(this, {client: false, userId: false});
  }
  get user() {
    return this.client.users.cache[this.userId];
  }
}

export class Friends {

  client: Client;

  cache: Record<string, Friend> = {};

  addFriend(data: RawFriend) {
    const friend = new Friend(this.client, data);
    this.cache[data.recipient._id] = friend;
    return friend;
  }

  constructor(client: Client) {
    this.client = client;
    makeAutoObservable(this, { client: false });
  }

  get array() {
    return Object.values(this.cache);
  }
}