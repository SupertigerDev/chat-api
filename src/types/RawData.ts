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
  joinedAt: number;
}