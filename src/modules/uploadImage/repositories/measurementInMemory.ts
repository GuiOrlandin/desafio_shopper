import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Measurement } from '../entities/measurement';
import { MeasurementRepository } from './measurementRepository';
import { MeasurementNotFound } from '../exceptions/measurementNotFound';
import { MeasurementWIthInvalidData } from '../exceptions/measurementWIthInvalidData';

export class UploadImageRepositoryInMemory implements MeasurementRepository {
  public measurements: Measurement[] = [];

  async fileService(image: string): Promise<string> {
    function isBase64(image: string): Boolean {
      return /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/.test(
        image,
      );
    }

    function deleteFile(file: string) {
      fs.unlink(`uploads/temporary/${file}`, (err) => {
        if (err) throw err;
      });
    }

    if (isBase64(image)) {
      const uploadsDir = path.join(process.cwd(), 'uploads');
      const tempDir = path.join(uploadsDir, 'temporary');

      const fileName = `${uuidv4()}.jpg`;
      const filePath = path.join(tempDir, fileName);

      console.log('Saving file to:', filePath);

      const imageBase64 = image.replace(/^data:image\/\w+;base64,/, '');
      const buffer = Buffer.from(imageBase64, 'base64');
      fs.writeFileSync(filePath, buffer);

      console.log('File saved successfully');

      setTimeout(() => {
        deleteFile(fileName), 1200;
      });

      return fileName;
    } else {
      throw new Error('Image is not Base 64');
    }
  }

  async createMeasurement(measurement: Measurement): Promise<void> {
    await this.measurements.push(measurement);
  }

  async findMeasurementByUuid(measurement_uuid: string): Promise<Measurement> {
    const measurement = this.measurements.find(
      (measurement) => measurement.measure_uuid === measurement_uuid,
    );

    if (!measurement) {
      return null;
    }

    return measurement;
  }

  async measurementSave(measurement: Measurement): Promise<boolean> {
    const measurementIndex = this.measurements.findIndex(
      (currentMeasurement) =>
        currentMeasurement.measure_uuid === measurement.measure_uuid,
    );

    if (!measurementIndex) {
      throw new MeasurementNotFound();
    }

    if (measurementIndex >= 0) {
      this.measurements[measurementIndex] = measurement;
    }

    return true;
  }

  async checkMeasureValue(
    measurement: Measurement,
    measure_value: number,
  ): Promise<boolean> {
    const measurementRaw = this.measurements.find(
      (measurement) => measurement.measure_uuid === measurement.measure_uuid,
    );

    if (measurementRaw.measure_value !== measurement.measure_value) {
      throw new MeasurementWIthInvalidData();
    }

    measurementRaw.measure_value = measure_value;

    return true;
  }
}
