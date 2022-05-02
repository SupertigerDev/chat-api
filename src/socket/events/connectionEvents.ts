import { Socket } from 'socket.io-client';
import { Client } from '../../common/Client';
import { Message } from '../../common/Message';
import { User } from '../../store/User';
import { AUTHENTICATE } from '../ClientEventNames';
import { AuthenticatedPayload } from './connectionEventTypes';

export function onConnect(client: Client, socket: Socket) {
  console.log('[WS] Connected to server.');
  socket.emit(AUTHENTICATE, {token: client.token});
}

export function onAuthenticated(client: Client, payload: AuthenticatedPayload) {
  console.log('[WS] Authenticated.');

  for (let i = 0; i < payload.servers.length; i++) {
    const server = payload.servers[i];
    client.servers.addServer(server);
  }

  for (let i = 0; i < payload.channels.length; i++) {
    const channel = payload.channels[i];
    client.channels.addChannel(channel);
  }  

  client.account.user = new User(client, payload.user);
}