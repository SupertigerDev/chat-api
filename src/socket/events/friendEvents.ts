import { Client } from '../../common/Client';
import { FriendStatus } from '../../store/Friends';
import { RawFriend } from '../../types/RawData';

export const onFriendRequestSent = (client: Client, payload: RawFriend) => {
  client.users._addUser(payload.recipient);
  client.friends._addFriend(payload);
};

export const onFriendRequestPending = (client: Client, payload: RawFriend) => {
  client.users._addUser(payload.recipient);
  client.friends._addFriend(payload);
};

export const onFriendRequestAccepted = (client: Client, payload: {friendId: string}) => {
  const friend = client.friends.cache[payload.friendId];
  friend._updateStatus(FriendStatus.FRIENDS);
};

export const onFriendRemoved = (client: Client, payload: {friendId: string}) => {
  client.friends._deleteFriend(payload.friendId);
};