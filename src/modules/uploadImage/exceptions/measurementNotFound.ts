import { HttpStatus } from '@nestjs/common';
import { AppException } from 'src/exceptions/appException';

export class MeasurementNotFound extends AppException {
  constructor() {
    super({
      error_code: 'MEASURE_NOT_FOUND',
      error_description: 'Leitura não encontrada',
      status: HttpStatus.NOT_FOUND,
    });
  }
}
