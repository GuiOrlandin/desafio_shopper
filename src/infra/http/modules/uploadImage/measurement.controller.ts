import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { MeasurementUseCase } from 'src/modules/uploadImage/useCases/measurementUseCaseUseCase';
import { CreateMeasurementBody } from './dtos/createMeasurementBody';

@Controller('upload')
export class MeasurementController {
  constructor(private measurementUseCase: MeasurementUseCase) {}

  @Post()
  @UseInterceptors()
  async UploadImage(@Body() body: CreateMeasurementBody) {
    const { image, customer_code, measure_datetime, measure_type } = body;

    const result = await this.measurementUseCase.execute({
      image,
      customer_code,
      measure_datetime,
      measure_type,
    });
    return result;
  }
}
