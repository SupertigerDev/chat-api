import { makeAutoObservable } from 'mobx';
import { deleteMessage } from '../services/messages';
import { Client } from './Client';


export enum MessageType {
  CONTENT = 0,
  JOIN_SERVER = 1,
  LEAVE_SERVER = 2,
  KICK_USER = 3,
  BAN_USER = 4,
}

interface MessageData {
  _id: string;
  channel: string;
  content?: string;
  createdBy: {
    _id: string;
    username: string;
    tag: string;
    hexColor: string;
  }
  type: MessageType;
  createdAt: number;
  editedAt?: number;
}

export class Message {
  client: Client;
  _id: string;
  channel: string;
  content?: string;
  createdAt: number;
  type: MessageType;
  createdBy: {
    _id: string;
    username: string;
    tag: string;
    hexColor: string;
  };
  editedAt?: number;

  constructor(client: Client, data: MessageData) {
    this._id = data._id;
    this.client = client;
    makeAutoObservable(this, {_id: false, client: false});
    this.channel = data.channel;
    this.content = data.content;
    this.type = data.type;
    this.createdAt = data.createdAt;
    this.editedAt = data.editedAt;
    this.createdBy = data.createdBy;
  }
  delete() {
    return deleteMessage(this.client, {
      channelId: this.channel,
      messageId: this._id,
    });
  }
}