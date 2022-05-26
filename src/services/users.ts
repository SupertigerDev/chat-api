import { Client } from '../common/Client';
import { request } from '../common/request';
import { RawChannel, RawInboxWithoutChannel } from '../types/RawData';
import Endpoints from './Endpoints';


export async function openDMChannelRequest(client: Client, userId: string) {
  return request<RawInboxWithoutChannel & {channel: RawChannel}>({
    url: Endpoints.openUserDMEndpoint(userId),
    method: 'POST',
    token: client.token,
  });
}