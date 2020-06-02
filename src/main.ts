import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

const port = process.env.PORT || 8080;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3333);
  Logger.log(`Server running on http://localhost:${port}`, 'BootStrap');
}
bootstrap();
