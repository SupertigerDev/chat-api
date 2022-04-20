import { Client } from '../common/Client';
import {io, Socket} from 'socket.io-client';
import { CONNECT, USER_AUTHENTICATED } from './ServerEventNames';
import { onAuthenticated, onConnect } from './events/connectionEvents';

export class SocketManager {
  socket: Socket;
  constructor(client: Client) {
    this.socket = io('http://localhost:80', {transports: ['websocket'], autoConnect: false});
    this.socket.on(CONNECT, () => onConnect(client, this.socket));
    this.socket.on(USER_AUTHENTICATED, payload => onAuthenticated(client, payload));
  }
  connect() {
    this.socket.connect();
  }
}