import { RawServer, RawUser } from '../../types/RawData';

export interface AuthenticatedPayload {
  user: SelfUser;
  servers: RawServer[];
  serverMembers: ServerMember[];
  channels: Channel[];
  presences: Presence[];
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


interface ServerMember {
  server: string;
  user: RawUser;
  joinedAt: number;
}

interface Channel {
  name: string
  _id: string;
  createdBy: string;
  server?: string;
  type: number;
  createdAt: number
}