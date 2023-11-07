import { WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway({
  namespace: 'ws',
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})
export class WsGetaway {

}