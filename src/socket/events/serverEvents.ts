import { Client } from '../../common/Client';
import { RawChannel, RawServer, RawServerMember } from '../../types/RawData';

interface ServerJoinedPayload {
  server: RawServer,
  members: RawServerMember[],
  channels: RawChannel[],
}

export function onServerJoined(client: Client, payload: ServerJoinedPayload) {
  
  const server = client.servers._addServer(payload.server);

  for (let index = 0; index < payload.channels.length; index++) {
    const channel = payload.channels[index];
    client.channels._addChannel(channel);
  }

  for (let i = 0; i < payload.members.length; i++) {
    const serverMember = payload.members[i];
    client.users._addUser(serverMember.user);
    server.serverMembers._addMember(serverMember);
  }

  client.eventEmitter.emitEvent('serverJoined', server);
}


interface ServerMemberJoinedPayload {
  serverId: string;
  member: RawServerMember;
}


export function onServerMemberJoined (client: Client, payload: ServerMemberJoinedPayload) {
  client.users._addUser(payload.member.user);
  const server = client.servers.cache[payload.serverId];
  server.serverMembers._addMember(payload.member);
}