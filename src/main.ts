import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { AuthGuard } from './guards/auth.guard';
import { JwtService } from '@nestjs/jwt';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.enableShutdownHooks();
  const jwtService = app.get(JwtService);
  app.useGlobalGuards(new AuthGuard(jwtService));
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  await app.listen(configService.get('PORT'));
}
bootstrap();
