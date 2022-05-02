import { Client } from '../common/Client';
import {io, Socket} from 'socket.io-client';
import { CONNECT, MESSAGE_CREATED, USER_AUTHENTICATED } from './ServerEventNames';
import { onAuthenticated, onConnect } from './events/connectionEvents';
import { onMessageCreated } from './events/messageEvents';

export class SocketManager {
  socket: Socket;
  constructor(client: Client) {
    this.socket = io('http://localhost:80', {transports: ['websocket'], autoConnect: false});
    this.socket.on(CONNECT, () => onConnect(client, this.socket));
    this.socket.on(USER_AUTHENTICATED, payload => onAuthenticated(client, payload));
    this.socket.on(MESSAGE_CREATED, payload => onMessageCreated(client, payload));
  }
  connect() {
    this.socket.connect();
  }
}