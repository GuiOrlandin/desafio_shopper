import { Module } from '@nestjs/common';
import { MeasurementRepository } from 'src/modules/uploadImage/repositories/measurementRepository';
import { PrismaService } from './prisma/prisma.service';
import { PrismaMeasurementRepository } from './prisma/repositories/prismaMeasurementRepository';

@Module({
  providers: [
    PrismaService,
    {
      provide: MeasurementRepository,
      useClass: PrismaMeasurementRepository,
    },
  ],
  exports: [MeasurementRepository],
})
export class DatabaseModule {}
