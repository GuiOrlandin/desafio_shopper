import { Measurement } from '../entities/measurement';

export interface MeasurementResponse {
  measure_uuid: string;
  measure_datetime: string;
  measure_type: string;
  has_confirmed: boolean;
  image_url: string;
}

export abstract class MeasurementRepository {
  abstract fileService(image: string): Promise<string>;
  abstract createMeasurement(measurement: Measurement): Promise<void>;
  abstract findMeasurementByUuid(
    measurement_uuid: string,
  ): Promise<Measurement>;
  abstract measurementSave(measurement: Measurement): Promise<boolean>;
  abstract checkMeasureValue(
    measurement: Measurement,
    measure_value: number,
  ): Promise<boolean>;
  abstract getAllCustomerMeasurements(
    customer_code: string,
  ): Promise<MeasurementResponse[]>;
  abstract getAllCustomerMeasurementsWithFilter(
    customer_code: string,
    type: string,
  ): Promise<MeasurementResponse[]>;
}
