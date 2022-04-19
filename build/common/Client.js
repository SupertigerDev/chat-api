import { SocketManager } from '../socket/SocketManager';
export class Client {
    constructor() {
        this.token = null;
        this.socketManager = new SocketManager(this);
    }
    login(token) {
        this.token = token;
        this.socketManager.connect();
    }
}
