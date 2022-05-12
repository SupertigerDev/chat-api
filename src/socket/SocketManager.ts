import { Client } from '../common/Client';
import {io, Socket} from 'socket.io-client';
import { CONNECT, MESSAGE_CREATED, MESSAGE_DELETED, SERVER_JOINED, SERVER_MEMBER_JOINED, USER_AUTHENTICATED, USER_PRESENCE_UPDATE } from './ServerEventNames';
import { onAuthenticated, onConnect } from './events/connectionEvents';
import { onMessageCreated, onMessageDeleted } from './events/messageEvents';
import { onServerJoined, onServerMemberJoined } from './events/serverEvents';
import { onPresenceChanged } from './events/userEvents';

export class SocketManager {
  socket: Socket;
  constructor(client: Client) {
    this.socket = io('http://localhost:80', {transports: ['websocket'], autoConnect: false});
    this.socket.on(CONNECT, () => onConnect(client, this.socket));
    this.socket.on(USER_AUTHENTICATED, payload => onAuthenticated(client, payload));

    this.socket.on(USER_PRESENCE_UPDATE, payload => onPresenceChanged(client, payload));

    this.socket.on(SERVER_JOINED, payload => onServerJoined(client, payload));
    this.socket.on(SERVER_MEMBER_JOINED, payload => onServerMemberJoined(client, payload));

    this.socket.on(MESSAGE_CREATED, payload => onMessageCreated(client, payload));
    this.socket.on(MESSAGE_DELETED, payload => onMessageDeleted(client, payload));
  }
  connect() {
    this.socket.connect();
  }
}