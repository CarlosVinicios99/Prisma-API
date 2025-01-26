import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UnauthorizedException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable, catchError } from 'rxjs';
import { UnauthorizedError } from '../types/unauthorized-error';

@Injectable()
export class UnauthorizedInterceptor implements NestInterceptor {

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    return next.handle().pipe(
      catchError(error => {
        if(error instanceof UnauthorizedError){
          throw new UnauthorizedException(error.message)
        }
        else {
          throw error
        }
      })
    )

  }

}
