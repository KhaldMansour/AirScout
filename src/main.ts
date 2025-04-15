import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  const configService = app.get(ConfigService);
  const swaggerConfig = new DocumentBuilder()
  .setTitle(configService.get<string>('APP_NAME') ?? 'AirScout')
  .setDescription('The API description')
  .setVersion('1.0')
  .build();

  const apiVersion = configService.get<string>('API_VERSION') || 'v1';
  app.setGlobalPrefix(`api/${apiVersion}`);

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document, {});
  
  const port = configService.get<number>('APP_PORT') || 3000;
  await app.listen(port);
}
bootstrap();
