import { Client } from '../common/Client';
import { Socket } from 'socket.io-client';
export declare class SocketManager {
    socket: Socket;
    constructor(client: Client);
    connect(): void;
}
