import { NestFactory } from '@nestjs/core';
import * as csurf from 'csurf';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(helmet());
  app.use(csurf());
  await app.listen(process.env.API_PORT);
}

bootstrap();
