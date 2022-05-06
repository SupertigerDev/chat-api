import { makeAutoObservable } from 'mobx';
import { Client } from '../common/Client';


interface ServerData {
  _id: string;
  name: string;
  defaultChannel: string;
  hexColor: string;
}

export class Server {

  client: Client;

  _id: string;

  name: string;

  defaultChannel: string;

  hexColor: string;

  constructor(client: Client, data: ServerData) {
    this.client = client;
    this._id = data._id;
    makeAutoObservable(this, {_id: false, client: false});
    this.name = data.name;
    this.hexColor = data.hexColor;
    this.defaultChannel = data.defaultChannel;
  }

  get channels() {
    return this.client.channels.array.filter(channel => channel.server === this._id);
  }
}

export class Servers {

  client: Client;

  cache: Record<string, Server> = {};

  addServer(data: ServerData) {
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