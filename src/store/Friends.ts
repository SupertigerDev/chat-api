import { makeAutoObservable } from 'mobx';
import { Client } from '../common/Client';
import { acceptFriendRequest, removeFriend } from '../services/friends';
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

  async acceptFriendRequest() {
    await acceptFriendRequest(this.client, {friendId: this.userId});
    this._updateStatus(FriendStatus.FRIENDS);
    return this;
  }

  async removeFriend() {
    await removeFriend(this.client, {friendId: this.userId});
    this.client.friends._deleteFriend(this.userId);
    return this.userId;
  }
  _updateStatus(status: FriendStatus) {
    this.status = status;
  }

  get user() {
    return this.client.users.cache[this.userId];
  }
}

export class Friends {

  client: Client;

  cache: Record<string, Friend> = {};

  _addFriend(data: RawFriend) {
    const friend = new Friend(this.client, data);
    this.cache[data.recipient._id] = friend;
    return friend;
  }
  _deleteFriend(friendId: string) {
    delete this.cache[friendId];
  }

  constructor(client: Client) {
    this.client = client;
    makeAutoObservable(this, { client: false });
  }

  get array() {
    return Object.values(this.cache);
  }
}