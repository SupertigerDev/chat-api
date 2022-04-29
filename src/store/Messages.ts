import { makeAutoObservable } from 'mobx';
import { Client } from '../common/Client';


interface MessageData {
  _id: string;
  channel: string;
  content?: string;
  createdAt: number;
  editedAt?: number;
}

class Message {
  _id: string;
  channel: string;
  content?: string;
  createdAt: number;
  editedAt?: number;

  constructor(data: MessageData) {
    this._id = data._id;
    makeAutoObservable(this, {_id: false});
    this.channel = data.channel;
    this.content = data.content;
    this.createdAt = data.createdAt;
    this.editedAt = data.editedAt;
  }
  

}


export class Messages {
  client: Client;
  cache: Record<string, Message> = {};
  constructor(client: Client) {
    this.client = client;
    makeAutoObservable(this, { client: false });
  }
  addMessage(data: MessageData) {
    const message = new Message(data);
    this.cache[message._id] = message;
  }
}