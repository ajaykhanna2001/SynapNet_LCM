import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS
  app.enableCors({
    origin: process.env.NODE_ENV === 'production' ? false : true,
    credentials: true,
  });
  
  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  
  // API prefix
  app.setGlobalPrefix('api');
  
  // Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('FleetOps Calendar API')
    .setDescription('Enterprise Operational Calendar Tool API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  
  const port = process.env.API_PORT || 8080;
  await app.listen(port);
  
  console.log(`🚀 FleetOps Calendar API is running on: http://localhost:${port}/api`);
  console.log(`📚 API Documentation: http://localhost:${port}/api/docs`);
}

bootstrap();