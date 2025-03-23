/*
  Warnings:

  - Added the required column `skitka` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "skitka" INTEGER NOT NULL;
