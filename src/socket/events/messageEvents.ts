import { Client } from '../../common/Client';
import { Message } from '../../common/Message';

export function onMessageCreated(client: Client, payload: any) {
  const message = new Message(payload);
  client.eventEmitter.emitEvent('messageCreated', message);
}