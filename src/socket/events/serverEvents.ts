import { Client } from '../../common/Client';
import { ServerMember } from '../../store/ServerMembers';
import { RawChannel, RawServer } from '../../types/RawData';

interface ServerJoinedPayload {
  server: RawServer,
  members: ServerMember[],
  channels: RawChannel[],
}

export function onServerJoined(client: Client, payload: ServerJoinedPayload) {
  
  const server = client.servers.addServer(payload.server);

  for (let index = 0; index < payload.channels.length; index++) {
    const channel = payload.channels[index];
    client.channels.addChannel(channel);
  }

  for (let i = 0; i < payload.members.length; i++) {
    const serverMember = payload.members[i];
    client.users.addUser(serverMember.user);
    server.serverMembers.addMember(serverMember);
  }

  client.eventEmitter.emitEvent('serverJoined', server);
}

export function onServerMemberJoined () {
  //
}