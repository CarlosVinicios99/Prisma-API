import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter<T extends HttpException> implements ExceptionFilter {

  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    const status: number = exception.getStatus()
    const exceptionResponse: string | object = exception.getResponse()

    const error =
      typeof response === 'string'
      ? {message: exception}
      : (exceptionResponse as object)

    response.status(status).json({
      ...error,
      timestamp: new Date().toISOString()
    })
  }

}
