import { HttpStatus } from '@nestjs/common';
import { AppException } from 'src/exceptions/appException';

export class MeasurementTypeAlreadyCreatedThisMonth extends AppException {
  constructor() {
    super({
      error_code: 'DOUBLE_REPORT',
      error_description: 'Já existe uma leitura para este tipo no mês atual',
      status: HttpStatus.CONFLICT,
    });
  }
}
