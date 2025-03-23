/*
  Warnings:

  - You are about to drop the column `count` on the `Like` table. All the data in the column will be lost.
  - You are about to drop the column `colorItemId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `ColorItem` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `productId` on table `Chat` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `colorId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ColorItem" DROP CONSTRAINT "ColorItem_colorId_fkey";

-- DropForeignKey
ALTER TABLE "ColorItem" DROP CONSTRAINT "ColorItem_productId_fkey";

-- AlterTable
ALTER TABLE "Chat" ALTER COLUMN "productId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Like" DROP COLUMN "count";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "colorItemId",
ADD COLUMN     "colorId" TEXT NOT NULL;

-- DropTable
DROP TABLE "ColorItem";

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "Color"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
