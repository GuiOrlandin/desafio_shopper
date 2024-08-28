-- CreateEnum
CREATE TYPE "TYPE" AS ENUM ('WATER', 'GAS');

-- CreateTable
CREATE TABLE "Measurements" (
    "measure_uuid" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "customer_code" TEXT NOT NULL,
    "measure_datetime" TIMESTAMP(3) NOT NULL,
    "measure_type" "TYPE" NOT NULL,
    "has_confirmed" BOOLEAN NOT NULL,

    CONSTRAINT "Measurements_pkey" PRIMARY KEY ("measure_uuid")
);
