import { Client } from '../../common/Client';
import { RawChannel, RawInboxWithoutChannel } from '../../types/RawData';

interface Presence {
  userId: string;
  custom?: string;
  status: number;
}

export function onPresenceChanged(client: Client, payload: Presence) {
  const user = client.users.cache[payload.userId];
  user?.setPresence(payload, true);
}

export function onInboxOpened(client: Client, payload: RawInboxWithoutChannel & {channel: RawChannel}) {
  client.channels._addChannel(payload.channel);
  client.inbox.add({channel: payload.channel._id});
}