import { makeAutoObservable } from 'mobx';
import { Client } from '../common/Client';
import { ServerMembers } from './ServerMembers';


interface ServerData {
  _id: string;
  name: string;
  defaultChannel: string;
  hexColor: string;
}

export class Server {

  client: Client;

  serverMembers: ServerMembers;

  _id: string;

  name: string;

  defaultChannel: string;

  hexColor: string;

  constructor(client: Client, data: ServerData) {
    this.client = client;
    this._id = data._id;
    this.serverMembers = new ServerMembers(client);
    makeAutoObservable(this, {_id: false, client: false, serverMembers: false});
    this.name = data.name;
    this.hexColor = data.hexColor;
    this.defaultChannel = data.defaultChannel;
  }

  get channels() {
    return this.client.channels.array.filter(channel => channel.server?._id === this._id);
  }
}

export class Servers {

  client: Client;

  cache: Record<string, Server> = {};

  _addServer(data: ServerData) {
    const server = new Server(this.client, data);
    this.cache[server._id] = server;
    return server;
  }

  constructor(client: Client) {
    this.client = client;
    makeAutoObservable(this, { client: false });
  }

  get array() {
    return Object.values(this.cache);
  }
}