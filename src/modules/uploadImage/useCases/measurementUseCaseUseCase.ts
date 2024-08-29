import { GoogleGenerativeAI, Part } from '@google/generative-ai';
import { Injectable } from '@nestjs/common';
import { MeasurementRepository } from '../repositories/measurementRepository';
import { Measurement } from '../entities/measurement';

interface UploadImage {
  customer_code: string;
  measure_datetime: Date;
  measure_type: string;
  image: string;
}

@Injectable()
export class MeasurementUseCase {
  constructor(private measurementRepository: MeasurementRepository) {}

  async execute({
    customer_code,
    measure_datetime,
    measure_type,
    image,
  }: UploadImage) {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const prompt = 'me fale o valor a pagar da conta!';

    const measurementDate = new Date(measure_datetime);

    const fileName = await this.measurementRepository.fileService(image);

    if (fileName) {
      const imagePart: Part = {
        inlineData: {
          data: image,
          mimeType: 'image/*',
        },
      };

      const result = await model.generateContent([prompt, imagePart]);
      let textValue = result.response.text();

      const textValueReplaced = textValue.replace(/\*\*/g, '').trim();

      const match = textValueReplaced.match(/(\d+[\.,]\d+)/);

      if (match) {
        const valueText = match[1].replace(',', '.');

        const floatValue = parseFloat(valueText);
        const intValue = Math.round(floatValue);

        const measurement = new Measurement({
          customer_code,
          measure_datetime: measurementDate,
          measure_type,
          has_confirmed: false,
          image_url: '',
          image,
          measure_value: intValue,
        });

        await this.measurementRepository.createMeasurement(measurement);

        return {
          image_url: `http://localhost:3333/files/temporary/${fileName}`,
          measure_value: intValue,
          measure_uuid: measurement.measure_uuid,
        };
      } else {
        console.log("Não foi encontrado 'R$' no texto.");
      }
    }
  }
}
