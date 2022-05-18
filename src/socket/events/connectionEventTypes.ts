import { RawChannel, RawFriend, RawServer, RawServerMember } from '../../types/RawData';

export interface AuthenticatedPayload {
  user: SelfUser;
  servers: RawServer[];
  serverMembers: RawServerMember[];
  channels: RawChannel[];
  presences: Presence[];
  friends: RawFriend[];
}


interface Presence {
  userId: string;
  custom?: string;
  status: number;
}

interface SelfUser {
  _id: string;
  username: string;
  hexColor: string;
  avatar?: string;
  tag: string;
}