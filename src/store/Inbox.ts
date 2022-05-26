import { makeAutoObservable } from 'mobx';
import { Client } from '../common/Client';




interface InboxData {
  channel: string;
}

export class InboxItem {

  client: Client;
  channelId: string;

  constructor(client: Client, data: InboxData) {
    this.client = client;
    this.channelId = data.channel;
    makeAutoObservable(this, {channelId: false, client: false});

    if (this.recipientIds?.length === 1) {
      this.channel.recipient?._setInboxChannelId(this.channelId);
    }

  }
  get channel() {
    return this.client.channels.cache?.[this.channelId];
  }
  get recipient() {
    return this.channel?.recipient;
  }
  get recipientIds() {
    return this.channel?.recipientIds;
  }
}




export class Inbox {
  client: Client;
  cache: Record<string, InboxItem> = {};
  
  constructor(client: Client) {
    this.client = client;
    makeAutoObservable(this, { client: false });
  }
  add(data: InboxData) {
    const item = new InboxItem(this.client, data);
    this.cache[data.channel] = item;
    return item;
  }
  get array() {
    return Object.values(this.cache);
  }
}