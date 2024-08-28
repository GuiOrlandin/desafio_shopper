import { Measurement } from '../entities/measurement';

export abstract class MeasurementRepository {
  abstract fileService(image: string): Promise<string>;
  abstract createMeasurement(measurement: Measurement): Promise<void>;
}
