import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UploadImageBody } from './dtos/uploadImageBody';
import { MeasurementUseCase } from 'src/modules/uploadImage/useCases/measurementUseCaseUseCase';

@Controller('upload')
export class MeasurementController {
  constructor(private measurementUseCase: MeasurementUseCase) {}

  @Post()
  @UseInterceptors()
  async UploadImage(@Body() body: UploadImageBody) {
    const { image, customer_code, measure_datetime, measure_type } = body;

    const test = await this.measurementUseCase.execute({
      image,
      customer_code,
      measure_datetime,
      measure_type,
    });
    return test;
  }
}
