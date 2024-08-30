import { MeasurementRepository } from '../repositories/measurementRepository';
import { Measurement } from '../entities/measurement';
import { MeasurementUseCase } from './measurementUseCaseUseCase';

jest.mock('@google/generative-ai', () => {
  return {
    GoogleGenerativeAI: jest.fn().mockImplementation(() => ({
      getGenerativeModel: jest.fn().mockReturnValue({
        generateContent: jest.fn().mockResolvedValue({
          response: {
            text: jest
              .fn()
              .mockReturnValue('O valor a pagar da conta é **123,45**.'),
          },
        }),
      }),
    })),
  };
});

describe('MeasurementUseCase', () => {
  let measurementUseCase: MeasurementUseCase;
  let measurementRepository: jest.Mocked<MeasurementRepository>;

  beforeEach(() => {
    measurementRepository = {
      createMeasurement: jest.fn(),
      fileService: jest.fn().mockResolvedValue('file-name.jpg'),
    } as any;
    measurementUseCase = new MeasurementUseCase(measurementRepository);
  });

  it('should create a measurement and return correct values', async () => {
    const input = {
      customer_code: '123',
      measure_datetime: new Date('2024-08-28T14:45:30.000Z'),
      measure_type: 'WATER',
      image: 'base64string',
    };

    const result = await measurementUseCase.execute(input);

    expect(measurementRepository.fileService).toHaveBeenCalledWith(input.image);
    expect(measurementRepository.createMeasurement).toHaveBeenCalledWith(
      expect.any(Measurement),
    );
    expect(result).toEqual({
      image_url: 'http://localhost:3333/files/temporary/file-name.jpg',
      measure_value: 123,
      measure_uuid: expect.any(String),
    });
  });
});
