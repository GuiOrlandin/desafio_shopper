import { Measurement } from '../entities/measurement';
import { MeasurementWIthInvalidData } from '../exceptions/measurementWIthInvalidData';
import { MeasurementRepositoryInMemory } from '../repositories/measurementInMemory';
import { ConfirmOrCorrectMeasurementUseCase } from './ConfirmOrCorrectMeasurementUseCase';

let confirmOrCorrectMeasurementUseCase: ConfirmOrCorrectMeasurementUseCase;
let measurementRepositoryInMemory: MeasurementRepositoryInMemory;

describe('ConfirmOrCorrectMeasurementUseCase', () => {
  beforeEach(() => {
    measurementRepositoryInMemory = new MeasurementRepositoryInMemory();
    confirmOrCorrectMeasurementUseCase = new ConfirmOrCorrectMeasurementUseCase(
      measurementRepositoryInMemory,
    );
  });

  it('Should be able to confirm measurement', async () => {
    const measurement = new Measurement({
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

    const user = await confirmOrCorrectMeasurementUseCase.execute({
      confirmed_value: measurement.measure_value,
      measure_uuid: measurement.measure_uuid,
    });

    expect(user).toEqual({ success: true });
  });

  it('should throw MeasurementWIthInvalidData if confirmed value does not match', async () => {
    const measurement = new Measurement({
      customer_code: '123',
      measure_datetime: new Date(),
      measure_type: 'GAS',
      has_confirmed: false,
      image_url: `http://localhost:3333/files/temporary/fileName`,
      image: 'base64string',
      measure_value: 123,
      measure_uuid: 'uuid',
    });

    await measurementRepositoryInMemory.createMeasurement(measurement);

    await expect(
      confirmOrCorrectMeasurementUseCase.execute({
        confirmed_value: 456,
        measure_uuid: measurement.measure_uuid,
      }),
    ).rejects.toThrow(MeasurementWIthInvalidData);
  });
});
