/*
  Warnings:

  - You are about to drop the column `isThumbnail` on the `ProductImage` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Product` ADD COLUMN `thumbnail` INTEGER;

-- AlterTable
ALTER TABLE `ProductImage` DROP COLUMN `isThumbnail`;
