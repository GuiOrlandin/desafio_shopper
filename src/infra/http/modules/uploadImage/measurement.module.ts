import { Module } from '@nestjs/common';
import { MeasurementUseCase } from 'src/modules/uploadImage/useCases/measurementUseCaseUseCase';
import { DatabaseModule } from 'src/infra/database/database.module';
import { MeasurementController } from './Measurement.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [MeasurementController],
  providers: [MeasurementUseCase],
})
export class MeasurementModule {}
