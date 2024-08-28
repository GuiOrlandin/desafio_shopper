import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Measurement } from '../entities/measurement';
import { MeasurementRepository } from './measurementRepository';

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
}
