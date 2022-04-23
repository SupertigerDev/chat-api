export interface AuthenticatedPayload {
  user: SelfUser;
  servers: Server[];
  serverMembers: ServerMember[];
  channels: Channel[];
}

interface SelfUser {
  _id: string;
  username: string;
  avatar?: string;
  tag: string;
}

interface User {
  _id: string;
  avatar?: string;
  username: string;
  tag: string;
  joinedAt: number;
}

interface Server {
  _id: string;
  name: string;
  hexColor: string;
  defaultChannel: string;
  createdBy: string;
  createdAt: number;
}

interface ServerMember {
  _id: string;
  server: string;
  user: User;
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