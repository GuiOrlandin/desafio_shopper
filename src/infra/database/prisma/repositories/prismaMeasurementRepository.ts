import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { MeasurementRepository } from 'src/modules/uploadImage/repositories/measurementRepository';
import { Measurement } from 'src/modules/uploadImage/entities/measurement';
import { PrismaService } from '../prisma.service';
import { TYPE } from '@prisma/client';
import { PrismaMeasurementMapper } from '../mappers/prismaMeasurementMapper';
import { MeasurementTypeAlreadyCreatedThisMonth } from 'src/modules/uploadImage/exceptions/MeasurementTypeAlreadyCreatedThisMonth';
import { MeasurementNotFound } from 'src/modules/uploadImage/exceptions/measurementNotFound';
import { MeasurementAlreadyConfirmed } from 'src/modules/uploadImage/exceptions/MeasurementAlreadyConfirmed';
import { MeasurementWIthInvalidData } from 'src/modules/uploadImage/exceptions/measurementWIthInvalidData';

@Injectable()
export class PrismaMeasurementRepository implements MeasurementRepository {
  constructor(private prisma: PrismaService) {}

  async findMeasurementByUuid(measurement_uuid: string): Promise<Measurement> {
    const measurement = await this.prisma.measurement.findFirst({
      where: {
        measure_uuid: measurement_uuid,
      },
    });

    if (!measurement) {
      return null;
    }

    return PrismaMeasurementMapper.toDomain(measurement);
  }

  async fileService(image: string): Promise<string> {
    function isBase64(image: string): Boolean {
      return /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/.test(
        image,
      );
    }

    function deleteFileAfterInterval(fileName: string, delay: number) {
      const start = Date.now();

      const interval = setInterval(() => {
        const timer = Date.now() - start;
        if (timer >= delay) {
          console.log(`Attempting to delete file: ${fileName}`);
          deleteFile(fileName);
          clearInterval(interval);
        } else {
          console.log(`Still waiting to delete file: ${fileName}`);
        }
      }, 10000);
    }

    function deleteFile(file: string) {
      fs.unlink(
        path.join(process.cwd(), `uploads/temporary/${file}`),
        (err) => {
          if (err) throw err;
        },
      );
    }

    if (isBase64(image)) {
      const tempDir = path.join(process.cwd(), 'uploads', 'temporary');

      const fileName = `${uuidv4()}.jpg`;
      const filePath = path.join(tempDir, fileName);

      const imageBase64 = image.replace(/^data:image\/\w+;base64,/, '');
      const buffer = Buffer.from(imageBase64, 'base64');
      fs.writeFileSync(filePath, buffer);

      deleteFileAfterInterval(fileName, 600000);

      return fileName;
    } else {
      throw new Error('Image is not Base 64');
    }
  }

  async createMeasurement(measurement: Measurement): Promise<void> {
    const startOfMonth = new Date(
      measurement.measure_datetime.getFullYear(),
      measurement.measure_datetime.getMonth(),
      1,
    );

    const endOfMonth = new Date(
      measurement.measure_datetime.getFullYear(),
      measurement.measure_datetime.getMonth() + 1,
      0,
    );

    const measurementRaw = PrismaMeasurementMapper.toPrisma(measurement);

    const existingMeasurement = await this.prisma.measurement.findFirst({
      where: {
        customer_code: measurement.customer_code,
        measure_type: measurement.measure_type as TYPE,
        has_confirmed: true,
        measure_datetime: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
      },
    });

    if (existingMeasurement) {
      throw new MeasurementTypeAlreadyCreatedThisMonth();
    }

    const updateUnconfirmedMeasurementIfExists =
      await this.prisma.measurement.findFirst({
        where: {
          customer_code: measurement.customer_code,
          measure_type: measurement.measure_type as TYPE,
          has_confirmed: false,
          measure_datetime: {
            gte: startOfMonth,
            lte: endOfMonth,
          },
        },
      });

    if (updateUnconfirmedMeasurementIfExists) {
      await this.prisma.measurement.update({
        data: measurementRaw,
        where: {
          measure_uuid: updateUnconfirmedMeasurementIfExists.measure_uuid,
        },
      });
    }

    if (!existingMeasurement && !updateUnconfirmedMeasurementIfExists) {
      await this.prisma.measurement.create({
        data: measurementRaw,
      });
    }
  }

  async measurementSave(measurement: Measurement): Promise<boolean> {
    const measurementUnmodified = await this.prisma.measurement.findFirst({
      where: {
        measure_uuid: measurement.measure_uuid,
      },
    });

    if (!measurementUnmodified) {
      throw new MeasurementNotFound();
    }

    if (measurementUnmodified.has_confirmed === true) {
      throw new MeasurementAlreadyConfirmed();
    }

    if (measurementUnmodified.image_url !== '') {
      const tempDir = path.join(process.cwd(), 'uploads', 'temporary');
      const parts = measurementUnmodified.image_url.split('temporary/');
      const fileName = parts[1];
      const filePath = path.join(tempDir, fileName);

      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Error: ${err}`);
        } else {
          console.log(`File ${filePath} deleted.`);
        }
      });
    }

    const uploadsDir = path.join(process.cwd(), 'uploads');
    const fileName = `${uuidv4()}.jpg`;

    const filePath = path.join(uploadsDir, fileName);

    const imageBase64 = measurementUnmodified.image.replace(
      /^data:image\/\w+;base64,/,
      '',
    );

    const buffer = Buffer.from(imageBase64, 'base64');
    fs.writeFileSync(filePath, buffer);

    await this.prisma.measurement.update({
      data: {
        ...measurementUnmodified,
        image: '',
        has_confirmed: true,
        image_url: `http://localhost:3333/files/uploads/${fileName}`,
      },

      where: {
        measure_uuid: measurement.measure_uuid,
      },
    });

    return true;
  }

  async checkMeasureValue(
    measurement: Measurement,
    measure_value: number,
  ): Promise<boolean> {
    const measurementRaw = await this.prisma.measurement.findFirst({
      where: {
        measure_uuid: measurement.measure_uuid,
      },
    });

    if (measurementRaw.measure_value !== measure_value) {
      throw new MeasurementWIthInvalidData();
    }

    await this.prisma.measurement.update({
      data: {
        ...measurementRaw,
        measure_value: measure_value,
      },

      where: {
        measure_uuid: measurement.measure_uuid,
      },
    });

    return true;
  }
}
