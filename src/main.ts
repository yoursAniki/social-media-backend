import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);

  app.use(cookieParser(config.getOrThrow<string>('COOKIES_SECRET')));

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.enableCors({
    origin: config.getOrThrow<string>('ALLOWED_ORIGIN'),
    credentials: true,
    exposedHeaders: ['set-cookie'],
  });

  app.setGlobalPrefix('api');

  await app.listen(config.getOrThrow<number>('APPLICATION_PORT'));
}
bootstrap();
