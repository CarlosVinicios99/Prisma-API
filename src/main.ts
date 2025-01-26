import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception/http-exception.filter';
import { UnauthorizedInterceptor } from './common/errors/interceptors/unauthorized.interceptor';
import { NotFoundInterceptor } from './common/errors/interceptors/not-found.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe(
    {
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    }
  ))

  app.useGlobalFilters(new HttpExceptionFilter())

  app.useGlobalInterceptors(new UnauthorizedInterceptor())
  app.useGlobalInterceptors(new NotFoundInterceptor())

  await app.listen(process.env.port || 3001);
}
bootstrap();
