import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  ConflictException,
} from '@nestjs/common';
import { Observable, catchError } from 'rxjs';
import { ConflictError } from '../types/conflict-error';

@Injectable()
export class ConflictInterceptor implements NestInterceptor {

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    return next.handle().pipe(
      catchError(error => {
        if(error instanceof ConflictError){
          throw new ConflictException()
        }
        else {
          throw error
        }
      })
    )

  }

}
