const API_PATH = 'http://localhost/api';

export default {
  messagesEndpoint: (channelId: string) => `${API_PATH}/channels/${channelId}/messages`,
};