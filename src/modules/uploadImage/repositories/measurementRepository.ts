import { Measurement } from '../entities/measurement';

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
}
