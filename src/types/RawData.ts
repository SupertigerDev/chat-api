export interface RawServer {
  _id: string;
  name: string;
  hexColor: string;
  defaultChannel: string;
  createdBy: string;
  createdAt: number;
}

export interface RawUser {
  _id: string;
  avatar?: string;
  username: string;
  hexColor: string;
  tag: string;
  joinedAt?: number;
}

export interface RawServerMember {
  server: string;
  user: RawUser;
  joinedAt: number;
}

export interface RawChannel {
  name: string
  _id: string;
  createdBy: string;
  server?: string;
  type: number;
  createdAt: number
}