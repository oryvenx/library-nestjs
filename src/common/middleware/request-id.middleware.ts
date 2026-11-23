import { Injectable, NestMiddleware } from '@nestjs/common';
import { randomUUID } from 'crypto';

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    let requestId = req.headers['x-request-id']

    if (!requestId) {
      requestId = randomUUID()
    }

    req['requestId'] = requestId;
    res.setHeader('X-Request-Id', requestId);
    next();
  }
}
