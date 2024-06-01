import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'node:process';
// pipes
import { ValidationPipe } from '~pipes/validation.pipe';

async function bootstrap() {
  const PORT = process.env.PORT || '5000';

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`, '-----', `Environment: ${process.env.NODE_ENV}`);
  });
}

bootstrap();
