import { Body, Controller, Patch, UseInterceptors } from '@nestjs/common';
import { ConfirmOrCorrectMeasurementUseCase } from 'src/modules/uploadImage/useCases/ConfirmOrCorrectMeasurementUseCase';
import { ConfirmMeasurementBody } from './dtos/confirmMeasurementBody';

@Controller('confirm')
export class ConfirmMeasurementController {
  constructor(
    private confirmOrCorrectMeasurementUseCase: ConfirmOrCorrectMeasurementUseCase,
  ) {}

  @Patch()
  @UseInterceptors()
  async confirmMeasurement(@Body() body: ConfirmMeasurementBody) {
    const { measure_uuid, confirmed_value } = body;

    const confirmed_value_numeric = parseInt(confirmed_value);

    const result = await this.confirmOrCorrectMeasurementUseCase.execute({
      measure_uuid,
      confirmed_value: confirmed_value_numeric,
    });
    return result;
  }
}
