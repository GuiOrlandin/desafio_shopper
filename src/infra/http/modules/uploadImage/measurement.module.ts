import { Module } from '@nestjs/common';
import { MeasurementUseCase } from 'src/modules/uploadImage/useCases/measurementUseCaseUseCase';
import { DatabaseModule } from 'src/infra/database/database.module';
import { MeasurementController } from './Measurement.controller';
import { ConfirmOrCorrectMeasurementUseCase } from 'src/modules/uploadImage/useCases/ConfirmOrCorrectMeasurementUseCase';
import { ConfirmMeasurementController } from './confirmMeasurement.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [MeasurementController, ConfirmMeasurementController],
  providers: [MeasurementUseCase, ConfirmOrCorrectMeasurementUseCase],
})
export class MeasurementModule {}
