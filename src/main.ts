import { NestFactory } from '@nestjs/core';
import * as process from 'node:process';
import { AppModule } from './app.module';
// pipes
import { ValidationPipe } from '~pipes/validation.pipe';
// config
import { createSwaggerDocument } from '~config/swagger-document.config';

async function bootstrap() {
  const PORT = process.env.PORT || '5000';

  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: '*' });

  app.useGlobalPipes(new ValidationPipe());

  await createSwaggerDocument(app);

  await app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`, '-----', `Environment: ${process.env.NODE_ENV}`);
  });
}

bootstrap();
