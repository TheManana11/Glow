import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import * as express from 'express';
import { SwaggerModule } from '@nestjs/swagger';
import { CORS_CONFIG, SWAGGER_CONFIG, VALIDATOR_CONFIG } from './config'
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(bodyParser.json({ limit: '20mb' }));
  app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }));

  app.enableCors(CORS_CONFIG);
  app.useGlobalPipes(VALIDATOR_CONFIG);

  const config = SWAGGER_CONFIG;
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
