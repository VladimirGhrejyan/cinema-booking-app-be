import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

export const createSwaggerDocument = async (app: INestApplication) => {
  const config = new DocumentBuilder().setTitle('Cinema Booking App').setVersion('0.1').build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  const outputPath = path.join(__dirname, '..', '..', 'static', 'swagger.json');
  const outputDir = path.join(__dirname, '..', '..', 'static');

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, JSON.stringify(document, null, 2));
};
