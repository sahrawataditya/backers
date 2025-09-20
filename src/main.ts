import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //GZIP Compression
  app.use(
    compression({
      level: 6,
      chunkSize: 6,
    }),
  );

  //Application CORS
  app.enableCors({
    origin: '*',
    methods: 'GET,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  //Global Prefix
  app.setGlobalPrefix('api');

  //Global Validation
  app.useGlobalPipes(new ValidationPipe());

  //Start Server
  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
