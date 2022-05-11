import { Client } from '../../common/Client';

interface Presence {
  userId: string;
  custom?: string;
  status: number;
}

export function onPresenceChanged(client: Client, payload: Presence) {
  const user = client.users.cache[payload.userId];
  user?.setPresence(payload, true);
}