import { SocketManager } from '../socket/SocketManager';
import { Channels } from '../store/Channels';
import { Servers } from '../store/Servers';
import {CustomEventEmitter} from '../common/EventEmitter';
import { ClientEvents } from './EventEmitter';
import { Account } from '../store/Account';
import { Users } from '../store/Users';
import { Friends } from '../store/Friends';
import { Inbox } from '../store/Inbox';




export class Client {

  token: string | null;
  
  socketManager: SocketManager;

  account: Account;

  servers: Servers;

  users: Users;
  friends: Friends;
  channels: Channels;
  inbox: Inbox;

  eventEmitter:  CustomEventEmitter;
  
  constructor() {
    this.token = null;
    this.socketManager = new SocketManager(this);

    this.account = new Account(this);
    this.users = new Users(this);
    this.friends = new Friends(this);
    this.servers = new Servers(this);
    this.channels = new Channels(this);
    this.inbox = new Inbox(this);

    this.eventEmitter = new CustomEventEmitter();
  }
  
  public login(token: string) {
    this.token = token;
    this.socketManager.connect();
  }

  public on <U extends keyof ClientEvents>(event: U, listener: ClientEvents[U]) {
    this.eventEmitter.addListener(event, listener);
  }
  public off <U extends keyof ClientEvents>(event: U, listener: ClientEvents[U]) {
    this.eventEmitter.removeListener(event, listener);
  }
}