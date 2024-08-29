import { HttpException, HttpStatus } from '@nestjs/common';

export interface AppExceptionProps {
  error_code: string;
  error_description: string;
  status: HttpStatus;
}

export class AppException extends HttpException {
  constructor({ error_code, error_description, status }: AppExceptionProps) {
    super(
      {
        error_code,
        error_description,
      },
      status,
    );
  }
}
