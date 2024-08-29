import { GoogleGenerativeAI, Part } from '@google/generative-ai';
import { Injectable } from '@nestjs/common';
import { MeasurementRepository } from '../repositories/measurementRepository';
import { MeasurementNotFound } from '../exceptions/measurementNotFound';

interface ConfirmOrCorrectMeasurement {
  measure_uuid: string;
  confirmed_value: number;
}

@Injectable()
export class ConfirmOrCorrectMeasurementUseCase {
  constructor(private measurementRepository: MeasurementRepository) {}

  async execute({
    confirmed_value,
    measure_uuid,
  }: ConfirmOrCorrectMeasurement) {
    const measurement =
      await this.measurementRepository.findMeasurementByUuid(measure_uuid);

    if (!measurement) {
      throw new MeasurementNotFound();
    }

    await this.measurementRepository.checkMeasureValue(
      measurement,
      confirmed_value,
    );

    const measurementSave =
      await this.measurementRepository.measurementSave(measurement);

    if (measurementSave) {
      return {
        success: true,
      };
    }
  }
}
