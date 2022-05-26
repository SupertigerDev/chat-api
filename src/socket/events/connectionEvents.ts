import { Socket } from 'socket.io-client';
import { Client } from '../../common/Client';
import { User } from '../../store/Users';
import { AUTHENTICATE } from '../ClientEventNames';
import { AuthenticatedPayload } from './connectionEventTypes';

export function onConnect(client: Client, socket: Socket) {
  console.log('[WS] Connected to server.');
  socket.emit(AUTHENTICATE, {token: client.token});
}

export function onAuthenticated(client: Client, payload: AuthenticatedPayload) {
  console.log('[WS] Authenticated.');

  client.account.setUser(new User(client, payload.user));
  
  for (let i = 0; i < payload.servers.length; i++) {
    const server = payload.servers[i];
    client.servers._addServer(server);
  }

  for (let i = 0; i < payload.channels.length; i++) {
    const channel = payload.channels[i];
    client.channels._addChannel(channel);
  }  

  for (let i = 0; i < payload.inbox.length; i++) {
    const inboxItem = payload.inbox[i];
    client.inbox.add(inboxItem);
  }

  for (let i = 0; i < payload.serverMembers.length; i++) {
    const serverMember = payload.serverMembers[i];
    client.users._addUser(serverMember.user);
    const server = client.servers.cache[serverMember.server];
    server?.serverMembers._addMember(serverMember);
  }

  for (let i = 0; i < payload.friends.length; i++) {
    const friend = payload.friends[i];
    client.users._addUser(friend.recipient);
    client.friends._addFriend(friend);
  }

  for (let i = 0; i < payload.presences.length; i++) {
    const presence = payload.presences[i];
    const user = client.users.cache[presence.userId];
    user?.setPresence(presence, true);    
  }




}