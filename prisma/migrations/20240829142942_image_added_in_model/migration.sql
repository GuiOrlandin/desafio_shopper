/*
  Warnings:

  - Added the required column `image` to the `Measurements` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Measurements" ADD COLUMN     "image" TEXT NOT NULL;
