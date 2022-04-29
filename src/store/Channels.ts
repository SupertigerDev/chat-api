import { makeAutoObservable } from 'mobx';
import { Client } from '../common/Client';

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
  emitToSelf: true,
};


export class ServerChannel {
  _id: string;

  type: ChannelType;

  name: string;

  server: string;

  constructor(data: ChannelData) {
    if (!data.server) throw new Error('ServerChannel must have a server.');
    this._id = data._id;
    makeAutoObservable(this, {_id: false});
    this.name = data.name;
    this.type = data.type;
    this.server = data.server;
  }
  sendMessage(content: string, opts: SendMessageOpts) {
    const options = { ...defaultSendMessageOpts, ...opts };
    
  }
}


export class Channels {

  client: Client;

  cache: Record<string, ServerChannel> = {};

  addChannel(data: ChannelData) {
    if (data.type === ChannelType.SERVER_TEXT) {
      const channel = new ServerChannel(data);
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