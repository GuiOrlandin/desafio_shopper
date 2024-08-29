import { HttpStatus } from '@nestjs/common';
import { AppException } from 'src/exceptions/appException';

export class MeasurementWIthInvalidData extends AppException {
  constructor() {
    super({
      error_code: 'INVALID_DATA',
      error_description: 'Dados inválidos fornecidos para a medição',
      status: HttpStatus.BAD_REQUEST,
    });
  }
}
