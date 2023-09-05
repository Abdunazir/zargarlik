import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

import * as cookieParser from 'cookie-parser';

const start = async () => {
  try {
    const config = new DocumentBuilder()
      .setTitle('Zargar Uz')
      .setDescription('Benfitial project for cleaning service finder')
      .setVersion('1.0.0')
      .addTag('NodeJs, NestJs, Postgress, Sequalize, Jwt')
      .build();
    const app = await NestFactory.create(AppModule);
    const PORT = process.env.PORT || 3030;
    const document = SwaggerModule.createDocument(app, config);
    app.setGlobalPrefix('api');
    SwaggerModule.setup('/docs', app, document);
    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe());

    await app.listen(PORT, () => {
      console.log(`Server ${PORT}-portda ishga tushdi`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
