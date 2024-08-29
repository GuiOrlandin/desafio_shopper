import { GoogleGenerativeAI, Part } from '@google/generative-ai';
import { Injectable } from '@nestjs/common';
import { MeasurementRepository } from '../repositories/measurementRepository';
import { Measurement } from '../entities/measurement';

interface UploadImage {
  measure_uuid: string;
  confirmed_value: string;
}

@Injectable()
export class MeasurementUseCase {}
