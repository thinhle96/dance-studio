import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { Reflector } from '@nestjs/core';
import jwt_decode from 'jwt-decode';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const groups = this.reflector.get<string[]>('groups', context.getHandler());
    const request = context.switchToHttp().getRequest();
    if (request.headers.authorization) {
      const jwt = request.headers.authorization.replace('Bearer ', '');
      const decodedHeader: {
        sub: string;
        iss: string;
        exp: number;
        iat: number;
        authorities: string[];
      } = jwt_decode(jwt);
      const currDate = new Date();
      const timestamp = currDate.valueOf();
      // decodedHeader.authorities.filter(authority => groups.includes(authority)).length != 0 &&
      if (decodedHeader.exp * 1000 > timestamp) {
        if (request.method === 'POST') {
          request.body.createdBy = decodedHeader.sub;
          request.body.createdAt = new Date().toISOString();
          request.body.updatedBy = decodedHeader.sub;
          request.body.updatedAt = new Date().toISOString();
        } else if (request.method === 'PUT') {
          request.body.updatedBy = decodedHeader.sub;
          request.body.updatedAt = new Date().toISOString();
        }
        return true;
      } else {
        throw new UnauthorizedException();
      }
    } else {
      throw new UnauthorizedException();
    }
  }
}
