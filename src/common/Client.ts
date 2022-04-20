import { SocketManager } from '../socket/SocketManager';
import { Servers } from '../store/Servers';

export class Client {

  token: string | null;
  
  socketManager: SocketManager;

  servers: Servers;

  constructor() {
    this.token = null;
    this.socketManager = new SocketManager(this);
    this.servers = new Servers(this);
  }
  
  public login(token: string) {
    this.token = token;
    this.socketManager.connect();
  }
}