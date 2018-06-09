import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from './config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useStaticAssets(__dirname + '/../public');
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    skipMissingProperties: true
  }));
  await app.listen(config.port);
}
bootstrap();
