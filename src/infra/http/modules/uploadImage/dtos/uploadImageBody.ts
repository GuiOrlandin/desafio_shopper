import { IsString, IsNotEmpty, IsDate, IsEnum } from 'class-validator';

enum MeasureType {
  WATER = 'WATER',
  GAS = 'GAS',
}

export class UploadImageBody {
  @IsString()
  @IsNotEmpty()
  customer_code: string;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsDate()
  @IsNotEmpty()
  measure_datetime: Date;

  @IsEnum(MeasureType)
  @IsNotEmpty()
  measure_type: MeasureType;
}
