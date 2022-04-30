import { makeAutoObservable } from 'mobx';
import { Client } from '../common/Client';
import { Message } from '../common/Message';
import { fetchMessages, postMessage } from '../services/messages';

export enum ChannelType {
  DM_TEXT = 0,
  SERVER_TEXT = 1,
  CATEGORY = 2,
}

interface ChannelData {
  name: string
  _id: string;
  server?: string;
  type: number;
}

interface SendMessageOpts {
  emitToSelf?: boolean;
}
const defaultSendMessageOpts: SendMessageOpts = {
  emitToSelf: false,
};


export class ServerChannel {
  client: Client;

  _id: string;

  type: ChannelType;

  name: string;

  server: string;

  constructor(client: Client, data: ChannelData) {
    if (!data.server) throw new Error('ServerChannel must have a server.');
    this._id = data._id;
    this.client = client;
    makeAutoObservable(this, {_id: false, client: false});
    this.name = data.name;
    this.type = data.type;
    this.server = data.server;
  }
  async sendMessage(content: string, opts?: SendMessageOpts) {
    const options = { ...defaultSendMessageOpts, ...opts };
    const rawMessage = await postMessage(this.client, {
      content: content,
      channelId: this._id,
      ...(!options.emitToSelf ? { socketId: this.client.socketManager.socket.id } : {}),
    });
    return new Message(rawMessage);
    
  }
  async getMessages() {
    const rawMessages = await fetchMessages(this.client, this._id);
    return rawMessages.map(rawMessage => new Message(rawMessage));
  }
}


export class Channels {

  client: Client;

  cache: Record<string, ServerChannel> = {};

  addChannel(data: ChannelData) {
    if (data.type === ChannelType.SERVER_TEXT) {
      const channel = new ServerChannel(this.client, data);
      this.cache[channel._id] = channel;
    }
  }

  constructor(client: Client) {
    this.client = client;
    makeAutoObservable(this, { client: false });
  }

  get array() {
    return Object.values(this.cache);
  }
}