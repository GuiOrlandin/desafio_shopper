import { Measurement as MeasurementRaw, TYPE } from '@prisma/client';
import { Measurement } from 'src/modules/uploadImage/entities/measurement';

export class PrismaMeasurementMapper {
  static toPrisma({
    customer_code,
    measure_datetime,
    measure_type,
    image_url,
    measure_uuid,
    has_confirmed,
    measure_value,
    image,
  }: Measurement): MeasurementRaw {
    return {
      customer_code,
      measure_datetime,
      measure_type: measure_type as TYPE,
      image_url,
      measure_uuid,
      has_confirmed,
      measure_value,
      image,
    };
  }

  static toDomain({
    customer_code,
    measure_datetime,
    measure_type,
    image_url,
    measure_uuid,
    has_confirmed,
    measure_value,
    image,
  }: MeasurementRaw): Measurement {
    return new Measurement({
      customer_code,
      measure_datetime,
      measure_type,
      image_url,
      measure_uuid,
      has_confirmed,
      measure_value,
      image,
    });
  }
}
