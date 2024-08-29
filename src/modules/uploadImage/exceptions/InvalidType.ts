import { HttpStatus } from '@nestjs/common';
import { AppException } from 'src/exceptions/appException';

export class InvalidType extends AppException {
  constructor() {
    super({
      error_code: 'INVALID_TYPE',
      error_description: 'Parâmetro measure type diferente de WATER ou GAS',
      status: HttpStatus.BAD_REQUEST,
    });
  }
}
