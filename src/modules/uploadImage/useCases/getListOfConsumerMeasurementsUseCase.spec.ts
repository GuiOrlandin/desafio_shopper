import { Measurement } from '../entities/measurement';
import { MeasurementRepositoryInMemory } from '../repositories/measurementInMemory';
import { GetListOfConsumerMeasurementsUseCase } from './getListOfConsumerMeasurementsUseCase';

describe('UploadImageRepositoryInMemory', () => {
  let getListOfConsumerMeasurementsUseCase: GetListOfConsumerMeasurementsUseCase;
  let measurementRepositoryInMemory: MeasurementRepositoryInMemory;

  beforeEach(() => {
    measurementRepositoryInMemory = new MeasurementRepositoryInMemory();
    getListOfConsumerMeasurementsUseCase =
      new GetListOfConsumerMeasurementsUseCase(measurementRepositoryInMemory);
  });

  it('should correctly save and retrieve a measurement', async () => {
    const measurement = new Measurement({
      customer_code: '123',
      measure_datetime: new Date(),
      measure_type: 'WATER',
      has_confirmed: true,
      image_url: `http://localhost:3333/files/temporary/fileName`,
      image: 'base64string',
      measure_value: 123,
      measure_uuid: 'uuid',
    });

    const measurement2 = new Measurement({
      customer_code: '123',
      measure_datetime: new Date(),
      measure_type: 'GAS',
      has_confirmed: true,
      image_url: `http://localhost:3333/files/temporary/fileName`,
      image: 'base64string',
      measure_value: 123,
      measure_uuid: 'uuid',
    });

    measurementRepositoryInMemory.createMeasurement(measurement);
    measurementRepositoryInMemory.createMeasurement(measurement2);

    const result = await getListOfConsumerMeasurementsUseCase.execute({
      customer_code: '123',
    });

    expect(result.measurements).toHaveLength(2);
  });

  it('should correctly save and retrieve a measurement with filter', async () => {
    const measurement = new Measurement({
      customer_code: '123',
      measure_datetime: new Date(),
      measure_type: 'WATER',
      has_confirmed: true,
      image_url: `http://localhost:3333/files/temporary/fileName`,
      image: 'base64string',
      measure_value: 123,
      measure_uuid: 'uuid',
    });

    const measurement2 = new Measurement({
      customer_code: '123',
      measure_datetime: new Date(),
      measure_type: 'GAS',
      has_confirmed: true,
      image_url: `http://localhost:3333/files/temporary/fileName`,
      image: 'base64string',
      measure_value: 123,
      measure_uuid: 'uuid',
    });

    measurementRepositoryInMemory.createMeasurement(measurement);
    measurementRepositoryInMemory.createMeasurement(measurement2);

    const result = await getListOfConsumerMeasurementsUseCase.execute({
      customer_code: '123',
      type: 'GAS',
    });

    expect(result.measurements).toHaveLength(1);
  });
});
