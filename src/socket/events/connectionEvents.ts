import { Socket } from 'socket.io-client';
import { Client } from '../../common/Client';
import { AUTHENTICATE } from '../ClientEventNames';

export function onConnect(client: Client, socket: Socket) {
  console.log('[WS] Connected to server.');
  socket.emit(AUTHENTICATE, {token: client.token});
}