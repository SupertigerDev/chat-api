import { Client } from '../common/Client';
import { request } from '../common/request';
import Endpoints from './Endpoints';

interface AcceptFriendOpts {
  friendId: string
}

export const acceptFriendRequest = async (client: Client, opts: AcceptFriendOpts) => {
  const data = await request<{message: string}>({
    method: 'POST',
    url: Endpoints.friendsEndpoint(opts.friendId),
    token: client.token,
  });
  return data;
};

interface RemoveFriendOpts {
  friendId: string
}

export const removeFriend = async (client: Client, opts: RemoveFriendOpts) => {
  const data = await request<{message: string}>({
    method: 'DELETE',
    url: Endpoints.friendsEndpoint(opts.friendId),
    token: client.token,
  });
  return data;
};