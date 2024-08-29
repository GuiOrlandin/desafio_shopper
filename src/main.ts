import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import { ValidationError, ValidationPipe } from '@nestjs/common';
import { MeasurementWIthInvalidData } from './modules/uploadImage/exceptions/measurementWIthInvalidData';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) => {
        return new MeasurementWIthInvalidData();
      },
    }),
  );
  await app.listen(3333);
}
bootstrap();
