import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
  OnGatewayConnection,
  OnGatewayDisconnect
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Socket } from 'socket.io';
import * as jwt from 'jsonwebtoken';
import { Payload } from '../common/auth/payload';
import { AuthService } from '../common/auth/auth.service';
import { Notice } from './notice.entity';

@WebSocketGateway()
export class NoticeGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() server: Socket;
  clients = {};

  constructor(
    private readonly authService: AuthService
  ) {}

  async handleConnection(client: Socket, ...args: any[]) {
    const token = client.handshake.query.token;
    const payload = jwt.decode(token) as Payload;
    const user = await this.authService.validate(payload);
    if (!user) {
      client.disconnect();
      return;
    }
    this.clients[user.id.toHexString()] = client.id;
  }

  handleDisconnect(client: Socket) {
    for (const key in this.clients) {
      if (client.id === this.clients[key]) {
        delete this.clients[key];
        break;
      }
    }
  }

/*   @SubscribeMessage('events')
  findAll(client: Socket, data): Observable<WsResponse<number>> {
    return from([1, 2, 3]).pipe(map(item => ({ event: 'events', data: item })));
  } */

  notice(userId: string, info: Notice) {
    if (this.clients[userId]) {
      this.server.to(this.clients[userId]).emit('notice', info);
    }
  }
}
