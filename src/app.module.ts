import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MeasurementModule } from './infra/http/modules/uploadImage/measurement.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads', 'temporary'),
      serveRoot: '/files/temporary',
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/files/uploads',
    }),
    ConfigModule.forRoot(),
    MeasurementModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
