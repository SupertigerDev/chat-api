import { makeAutoObservable } from 'mobx';
import { Client } from '../common/Client';
import { Message } from '../common/Message';
import { fetchMessages, postMessage } from '../services/messages';
import { RawUser } from '../types/RawData';
import { Server } from './Servers';
import { User } from './Users';

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
  recipients?: RawUser[];
}

interface SendMessageOpts {
  emitToSelf?: boolean;
}
const defaultSendMessageOpts: SendMessageOpts = {
  emitToSelf: false,
};


export class Channel {
  client: Client;

  _id: string;

  type: ChannelType;

  name: string;

  serverId?: string;
  recipientIds?: string[];

  constructor(client: Client, data: ChannelData) {
    this._id = data._id;
    this.client = client;
    makeAutoObservable(this, {_id: false, client: false});
    this.name = data.name;
    this.type = data.type;
    this.serverId = data.server;

    if (this.type === ChannelType.DM_TEXT && data.recipients) {
      this.recipientIds = [];
      for (let i = 0; i < data.recipients.length; i++) {
        const user = data.recipients[i];
        if (user._id === client.account.user?._id) continue;
        const newUser = client.users._addUser(user);
        newUser._setInboxChannelId(this._id);
        this.recipientIds.push(user._id);
      }
    }
  }
  async sendMessage(content: string, opts?: SendMessageOpts) {
    const options = { ...defaultSendMessageOpts, ...opts };
    const rawMessage = await postMessage(this.client, {
      content: content,
      channelId: this._id,
      ...(!options.emitToSelf ? { socketId: this.client.socketManager.socket.id } : {}),
    });
    return new Message(this.client, rawMessage);
    
  }
  async getMessages() {
    const rawMessages = await fetchMessages(this.client, this._id);
    return rawMessages.map(rawMessage => new Message(this.client, rawMessage));
  }
  get server(): Server | null {
    if (!this.serverId) return null;
    return this.client.servers.cache[this.serverId];
  }
  get recipient(): User | null {
    if (!this.recipientIds) return null;
    return this.client.users.cache[this.recipientIds[0]];
  }
}


export class Channels {

  client: Client;

  cache: Record<string, Channel> = {};

  _addChannel(data: ChannelData) {
    const channel = new Channel(this.client, data);
    this.cache[channel._id] = channel;
  }

  constructor(client: Client) {
    this.client = client;
    makeAutoObservable(this, { client: false });
  }

  get array() {
    return Object.values(this.cache);
  }
}