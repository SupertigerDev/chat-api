import { Client } from '../../common/Client';
import { RawFriend } from '../../types/RawData';

export const onFriendRequestSent = (client: Client, payload: RawFriend) => {
  client.users.addUser(payload.recipient);
  client.friends.addFriend(payload);
};

export const onFriendRequestPending = (client: Client, payload: RawFriend) => {
  client.users.addUser(payload.recipient);
  client.friends.addFriend(payload);
};