import { io } from 'socket.io-client';
import { CONNECT } from './ServerEventNames';
import { onConnect } from './events/connectionEvents';
export class SocketManager {
    constructor(client) {
        this.socket = io('http://localhost:80', { transports: ['websocket'], autoConnect: false });
        this.socket.on(CONNECT, () => onConnect(client, this.socket));
    }
    connect() {
        this.socket.connect();
    }
}
