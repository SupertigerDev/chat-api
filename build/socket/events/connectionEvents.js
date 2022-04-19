import { AUTHENTICATE } from '../ClientEventNames';
export function onConnect(client, socket) {
    console.log('[WS] Connected to server.');
    socket.emit(AUTHENTICATE, { token: client.token });
}
