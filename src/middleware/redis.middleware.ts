import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class RedisMiddleware implements NestMiddleware {
  constructor() {}

  async use(req: any, res: any, next: () => void) {
    console.log('req', req);
    next();
  }
}
