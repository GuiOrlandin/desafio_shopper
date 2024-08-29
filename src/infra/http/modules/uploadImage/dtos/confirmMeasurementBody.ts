import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class ConfirmMeasurementBody {
  @IsString()
  @IsNotEmpty()
  measure_uuid: string;

  @IsString()
  @IsNotEmpty()
  confirmed_value: string;
}
