import {ExecutionContext, Injectable} from '@nestjs/common';
import {Observable} from 'rxjs';
import {AuthGuard} from "@nestjs/passport";

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        return true;
    }
}
