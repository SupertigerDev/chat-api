import { Socket } from 'socket.io-client';
import { Client } from '../../common/Client';
import { Message } from '../../common/Message';
import { User } from '../../store/Users';
import { AUTHENTICATE } from '../ClientEventNames';
import { AuthenticatedPayload } from './connectionEventTypes';

export function onConnect(client: Client, socket: Socket) {
  console.log('[WS] Connected to server.');
  socket.emit(AUTHENTICATE, {token: client.token});
}

export function onAuthenticated(client: Client, payload: AuthenticatedPayload) {
  console.log('[WS] Authenticated.');

  for (let i = 0; i < payload.servers.length; i++) {
    const server = payload.servers[i];
    client.servers.addServer(server);
  }

  for (let i = 0; i < payload.channels.length; i++) {
    const channel = payload.channels[i];
    client.channels.addChannel(channel);
  }  

  for (let i = 0; i < payload.serverMembers.length; i++) {
    const serverMember = payload.serverMembers[i];
    client.users.addUser(serverMember.user);
    const server = client.servers.cache[serverMember.server];
    server?.serverMembers.addMember(serverMember);
  }

  for (let i = 0; i < payload.presences.length; i++) {
    const presence = payload.presences[i];
    const user = client.users.cache[presence.userId];
    user?.setPresence(presence, true);    
  }

  client.account.setUser(new User(client, payload.user));
}