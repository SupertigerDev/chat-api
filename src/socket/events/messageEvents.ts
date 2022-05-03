import { Client } from '../../common/Client';
import { Message } from '../../common/Message';

export function onMessageCreated(client: Client, payload: any) {
  const message = new Message(client, payload);
  client.eventEmitter.emitEvent('messageCreated', message);
}

export function onMessageDeleted(client: Client, payload: {channelId: string, messageId: string}) {
  client.eventEmitter.emitEvent('messageDeleted', payload);
}