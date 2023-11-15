/*
  Warnings:

  - You are about to drop the column `enrolledOnOnlyDate` on the `BlockingDeviceDataStepOne` table. All the data in the column will be lost.
  - You are about to drop the column `enrolledOnOnlyDate` on the `BlockingDeviceDataStepTwo` table. All the data in the column will be lost.
  - You are about to drop the column `enrolledOnOnlyDate` on the `BlockingDeviceDataStepTwoBackup` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BlockingDeviceDataStepOne" DROP COLUMN "enrolledOnOnlyDate";

-- AlterTable
ALTER TABLE "BlockingDeviceDataStepTwo" DROP COLUMN "enrolledOnOnlyDate";

-- AlterTable
ALTER TABLE "BlockingDeviceDataStepTwoBackup" DROP COLUMN "enrolledOnOnlyDate";
