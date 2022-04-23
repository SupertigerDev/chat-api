import { SocketManager } from '../socket/SocketManager';
import { Channels } from '../store/Channels';
import { Servers } from '../store/Servers';

export class Client {

  token: string | null;
  
  socketManager: SocketManager;

  servers: Servers;

  channels: Channels;

  constructor() {
    this.token = null;
    this.socketManager = new SocketManager(this);
    this.servers = new Servers(this);
    this.channels = new Channels(this);
  }
  
  public login(token: string) {
    this.token = token;
    this.socketManager.connect();
  }
}