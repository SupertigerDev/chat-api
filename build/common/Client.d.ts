import { SocketManager } from '../socket/SocketManager';
export declare class Client {
    token: string | null;
    socketManager: SocketManager;
    constructor();
    login(token: string): void;
}
