import { makeAutoObservable } from 'mobx';
import { Client } from '../common/Client';
import { RawUser } from '../types/RawData';


interface ServerMemberData {
  user: RawUser
}

export class ServerMember {

  client: Client;
  
  userId: string;

  constructor(client: Client, data: ServerMemberData) {
    this.client = client;
    this.userId = data.user._id;
    makeAutoObservable(this, {userId: false, client: false});
  }
  get user() {
    return this.client.users.cache[this.userId];
  }
}

export class ServerMembers {

  client: Client;

  cache: Record<string, ServerMember> = {};

  addMember(data: ServerMemberData) {
    const member = new ServerMember(this.client, data);
    this.cache[data.user._id] = member;
    return member;
  }

  constructor(client: Client) {
    this.client = client;
    makeAutoObservable(this, { client: false });
  }

  get array() {
    return Object.values(this.cache);
  }
}