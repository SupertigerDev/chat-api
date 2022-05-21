import { Client } from '../common/Client';
import {io, Socket} from 'socket.io-client';
import { CONNECT, FRIEND_REMOVED, FRIEND_REQUEST_ACCEPTED, FRIEND_REQUEST_PENDING, FRIEND_REQUEST_SENT, MESSAGE_CREATED, MESSAGE_DELETED, SERVER_JOINED, SERVER_MEMBER_JOINED, USER_AUTHENTICATED, USER_PRESENCE_UPDATE } from './ServerEventNames';
import { onAuthenticated, onConnect } from './events/connectionEvents';
import { onMessageCreated, onMessageDeleted } from './events/messageEvents';
import { onServerJoined, onServerMemberJoined } from './events/serverEvents';
import { onPresenceChanged } from './events/userEvents';
import { onFriendRemoved, onFriendRequestAccepted, onFriendRequestPending, onFriendRequestSent } from './events/friendEvents';

export class SocketManager {
  socket: Socket;
  constructor(client: Client) {
    this.socket = io('http://localhost:80', {transports: ['websocket'], autoConnect: false});
    this.socket.on(CONNECT, () => onConnect(client, this.socket));
    this.socket.on(USER_AUTHENTICATED, payload => onAuthenticated(client, payload));

    this.socket.on(USER_PRESENCE_UPDATE, payload => onPresenceChanged(client, payload));

    this.socket.on(FRIEND_REQUEST_SENT, payload => onFriendRequestSent(client, payload));
    this.socket.on(FRIEND_REQUEST_PENDING, payload => onFriendRequestPending(client, payload));

    this.socket.on(FRIEND_REQUEST_ACCEPTED, payload => onFriendRequestAccepted(client, payload));
    this.socket.on(FRIEND_REMOVED, payload => onFriendRemoved(client, payload));
    


    this.socket.on(SERVER_JOINED, payload => onServerJoined(client, payload));
    this.socket.on(SERVER_MEMBER_JOINED, payload => onServerMemberJoined(client, payload));

    this.socket.on(MESSAGE_CREATED, payload => onMessageCreated(client, payload));
    this.socket.on(MESSAGE_DELETED, payload => onMessageDeleted(client, payload));
  }
  connect() {
    this.socket.connect();
  }
}