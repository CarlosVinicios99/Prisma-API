import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UnauthorizedException,
  NotFoundException
} from '@nestjs/common';
import { Observable, catchError } from 'rxjs';
import { NotFoundError } from '../types/not-found-error';


export class NotFoundInterceptor {

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    return next.handle().pipe(
      catchError(error => {
        if(error instanceof NotFoundError){
          throw new NotFoundException(error.message)
        }
        else {
          throw error
        }
      })
    )

  }
}
