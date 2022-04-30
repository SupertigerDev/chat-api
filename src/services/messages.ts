import { Client } from '../common/Client';
import { request } from '../common/request';
import Endpoints from './Endpoints';


interface Message {
  _id: string;
  channel: string;
  content?: string;
  createdBy: {
    _id: string;
    username: string;
    tag: string;
    hexColor: string;
  };
  createdAt: number;
  editedAt?: number;
}

export const fetchMessages = async (client: Client, channelId: string) => {
  const data = await request<Message[]>({
    method: 'GET',
    url: Endpoints.messagesEndpoint(channelId),
    token: client.token,
  });
  return data;
};

interface PostMessageOpts {
  content: string;
  channelId: string;
  socketId?: string;
}

export const postMessage = async (client: Client, opts: PostMessageOpts) => {
  const data = await request<Message>({
    method: 'POST',
    url: Endpoints.messagesEndpoint(opts.channelId),
    token: client.token,
    body: {
      content: opts.content,
      ...(opts.socketId ? { socketId: opts.socketId } : {}),
    }
  });
  return data;
};