import { SocketManager } from '../socket/SocketManager';

export class Client {

  token: string | null;
  socketManager: SocketManager;

  constructor() {
    this.token = null;
    this.socketManager = new SocketManager(this);
  }
  
  public login(token: string) {
    this.token = token;
    this.socketManager.connect();
  }
}