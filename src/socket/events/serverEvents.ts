import { Client } from '../../common/Client';

interface ServerJoinedPayload {
  server: any,
  members: any[],
  channels: any[],
}

export function onServerJoined(client: Client, payload: ServerJoinedPayload) {
  
  const server = client.servers.addServer(payload.server);

  for (let index = 0; index < payload.channels.length; index++) {
    const channel = payload.channels[index];
    client.channels.addChannel(channel);
  }

  client.eventEmitter.emitEvent('serverJoined', server);
}

export function onServerMemberJoined () {
  //
}