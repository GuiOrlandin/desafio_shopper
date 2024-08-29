import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UploadImageBody } from './dtos/uploadImageBody';
import { MeasurementUseCase } from 'src/modules/uploadImage/useCases/measurementUseCaseUseCase';
import { MeasurementWIthInvalidData } from 'src/modules/uploadImage/exceptions/measurementWIthInvalidData';

@Controller('upload')
export class MeasurementController {
  constructor(private measurementUseCase: MeasurementUseCase) {}

  @Post()
  @UseInterceptors()
  async UploadImage(@Body() body: UploadImageBody) {
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
