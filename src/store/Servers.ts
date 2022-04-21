import { makeAutoObservable } from 'mobx';
import { Client } from '../common/Client';


interface ServerData {
  _id: string;
  name: string;
  defaultChannel: string;
  hexColor: string;
}

export class Server {

  _id: string;

  name: string;

  defaultChannel: string;

  hexColor: string;

  constructor(data: ServerData) {
    makeAutoObservable(this, {_id: false});
    this._id = data._id;
    this.name = data.name;
    this.hexColor = data.hexColor;
    this.defaultChannel = data.defaultChannel;
  }
}

export class Servers {

  client: Client;

  cache: Record<string, Server> = {};

  addServer(data: ServerData) {
    const server = new Server(data);
    this.cache[server._id] = server;
  }

  constructor(client: Client) {
    this.client = client;
    makeAutoObservable(this, { client: false });
  }

  get array() {
    return Object.values(this.cache);
  }
}