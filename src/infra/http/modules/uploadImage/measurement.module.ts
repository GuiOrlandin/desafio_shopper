import { Module } from '@nestjs/common';
import { MeasurementUseCase } from 'src/modules/uploadImage/useCases/measurementUseCaseUseCase';
import { DatabaseModule } from 'src/infra/database/database.module';
import { MeasurementController } from './Measurement.controller';
import { ConfirmOrCorrectMeasurementUseCase } from 'src/modules/uploadImage/useCases/ConfirmOrCorrectMeasurementUseCase';
import { ConfirmMeasurementController } from './confirmMeasurement.controller';
import { GetListOfConsumerMeasurementsUseCase } from 'src/modules/uploadImage/useCases/getListOfConsumerMeasurementsUseCase';
import { getListOfCustomerMeasurementsController } from './getListOfCustomerMeasurementsController';

@Module({
  imports: [DatabaseModule],
  controllers: [
    MeasurementController,
    ConfirmMeasurementController,
    getListOfCustomerMeasurementsController,
  ],
  providers: [
    MeasurementUseCase,
    ConfirmOrCorrectMeasurementUseCase,
    GetListOfConsumerMeasurementsUseCase,
  ],
})
export class MeasurementModule {}
