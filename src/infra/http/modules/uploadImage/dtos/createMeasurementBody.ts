import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsDate, IsEnum } from 'class-validator';

enum MeasureType {
  WATER = 'WATER',
  GAS = 'GAS',
}

export class CreateMeasurementBody {
  @IsString()
  @IsNotEmpty()
  customer_code: string;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  measure_datetime: Date;

  @IsEnum(MeasureType)
  @IsNotEmpty()
  measure_type: MeasureType;
}
