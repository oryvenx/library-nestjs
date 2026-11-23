import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { request } from 'express';
import { map, Observable } from 'rxjs';

@Injectable()
export class ResponseEnvelopeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const reqId = req['requestId'];
    return next.handle().pipe(
      map((data) => {
        const res: any = {
          success: true,
          requestId: reqId,
        };

        if (Array.isArray(data)) {
          res.count = data.length;
        }

        res.data = data;

        return res;
      }),
    );
  }
}
