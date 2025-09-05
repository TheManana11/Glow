import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import * as express from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,             
    forbidNonWhitelisted: true,  
    transform: true,             
    transformOptions: {
      enableImplicitConversion: true, 
    },
  }));

  const config = new DocumentBuilder()
    .setTitle('My Glow APIs')                
    .setDescription('API documentation for my project')
    .setVersion('1.0')                 
    .addBearerAuth()                    // Add JWT auth option in Swagger
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
