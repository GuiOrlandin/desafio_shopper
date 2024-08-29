import {
  Body,
  Controller,
  Get,
  Query,
  UseInterceptors,
  Param,
} from '@nestjs/common';
import { InvalidType } from 'src/modules/uploadImage/exceptions/InvalidType';
import { GetListOfConsumerMeasurementsUseCase } from 'src/modules/uploadImage/useCases/getListOfConsumerMeasurementsUseCase';

@Controller(':customer_code')
export class getListOfCustomerMeasurementsController {
  constructor(
    private getListOfConsumerMeasurementsUseCase: GetListOfConsumerMeasurementsUseCase,
  ) {}

  @Get('/list')
  @UseInterceptors()
  async getListOfCustomerMeasurements(
    @Query('type') type: string,
    @Param('customer_code') customer_code: string,
  ) {
    if (customer_code && !type) {
      const result = await this.getListOfConsumerMeasurementsUseCase.execute({
        customer_code,
      });

      return result;
    } else {
      if (type !== 'WATER' || 'GAS') {
        throw new InvalidType();
      }

      const result = await this.getListOfConsumerMeasurementsUseCase.execute({
        customer_code,
        type,
      });

      return result;
    }
  }
}
