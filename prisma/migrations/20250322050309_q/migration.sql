/*
  Warnings:

  - The `data` column on the `Session` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Session" DROP COLUMN "data",
ADD COLUMN     "data" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;
