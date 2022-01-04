import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import compression from 'fastify-compress';
import { fastifyHelmet } from 'fastify-helmet';
import fastifyCookie from 'fastify-cookie';
import fastifyCsrf from 'fastify-csrf';

import { AppModule } from './app/app.module';
import cryptoRandomString from 'crypto-random-string';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.enableCors();
  app.register(fastifyHelmet);
  app.register(compression);
  app.register(fastifyCookie, { secret: cryptoRandomString({ length: 16 }) });
  app.register(fastifyCsrf, { cookieOpts: { signed: true } });
  const port = process.env.PORT || 3333;
  await app.listen(port, '0.0.0.0');
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
