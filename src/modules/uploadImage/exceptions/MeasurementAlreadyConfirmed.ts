import { HttpStatus } from '@nestjs/common';
import { AppException } from 'src/exceptions/appException';

export class MeasurementAlreadyConfirmed extends AppException {
  constructor() {
    super({
      error_code: 'CONFIRMATION_DUPLICATE',
      error_description: 'Leitura já confirmada ',
      status: HttpStatus.CONFLICT,
    });
  }
}
