import { Measurement } from '@prisma/client';
import {
  MeasurementRepository,
  MeasurementResponse,
} from '../repositories/measurementRepository';
import { Injectable } from '@nestjs/common';

interface getListOfConsumerMeasurements {
  customer_code: string;
  type?: string;
}

@Injectable()
export class GetListOfConsumerMeasurementsUseCase {
  constructor(private measurementRepository: MeasurementRepository) {}

  async execute({ customer_code, type }: getListOfConsumerMeasurements) {
    if (customer_code && !type) {
      const measurements =
        await this.measurementRepository.getAllCustomerMeasurements(
          customer_code,
        );

      return {
        customer_code,
        measurements,
      };
    } else {
      const measurements =
        await this.measurementRepository.getAllCustomerMeasurementsWithFilter(
          customer_code,
          type,
        );

      return {
        customer_code,
        measurements,
      };
    }
  }
}
