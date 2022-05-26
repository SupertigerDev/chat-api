const API_PATH = 'http://localhost/api';

export default {
  openUserDMEndpoint: (userId: string) => `${API_PATH}/users/${userId}/open-channel`,
  messagesEndpoint: (channelId: string) => `${API_PATH}/channels/${channelId}/messages`,
  messageEndpoint: (channelId: string, messageId: string) => `${API_PATH}/channels/${channelId}/messages/${messageId}`,
  friendsEndpoint: (friendId: string) => `${API_PATH}/friends/${friendId}`,

};