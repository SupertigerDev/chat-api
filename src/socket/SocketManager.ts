import { Client } from '../common/Client';
import {io, Socket} from 'socket.io-client';
import { CONNECT } from './ServerEventNames';
import { onConnect } from './events/connectionEvents';

export class SocketManager {
  socket: Socket;
  constructor(client: Client) {
    this.socket = io('http://localhost:80', {transports: ['websocket'], autoConnect: false});
    this.socket.on(CONNECT, () => onConnect(client, this.socket));
  }
  connect() {
    this.socket.connect();
  }
}