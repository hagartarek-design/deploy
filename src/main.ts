
import * as path from 'path';
import {join} from 'path';
import * as express from 'express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
// app.enableCors({
//   origin: '*',
// });



  app.use('/uploads', express.static(path.join(__dirname, '..', '..', 'uploads')));
  app.useStaticAssets(join(__dirname, '..', 'uploads', 'pdf-images'), {
    prefix: '/pdf-images/', // URL prefix
  });

  app.enableCors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
//  app.enableCors({
//   origin: true,
//   credentials: true,
// });
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
// app.enableCors({
//   origin: ['http://localhost','http://10.1.12.41:3300','http://10.1.12.41:4000/', 'http://192.168.1.6:3000/'],
//   credentials: true,
// });
await app.listen(4000, '0.0.0.0');
}
bootstrap();

 
 