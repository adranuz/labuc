/*
  Warnings:

  - You are about to drop the column `enrolledOnCount3Months` on the `BlockingDeviceReport` table. All the data in the column will be lost.
  - Made the column `customerEmail` on table `BlockingDeviceComplete` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "ActivationReport_customerEmail_deviceType_idx";

-- AlterTable
ALTER TABLE "BlockingDeviceComplete" ALTER COLUMN "customerEmail" SET NOT NULL;

-- AlterTable
ALTER TABLE "BlockingDeviceReport" DROP COLUMN "enrolledOnCount3Months",
ADD COLUMN     "sku3mCounter" INTEGER,
ADD COLUMN     "skuEndCounter" INTEGER,
ADD COLUMN     "skuStartCounter" INTEGER;

-- CreateTable
CREATE TABLE "BlockingDeviceCompleteSku" (
    "customerId" TEXT,
    "deviceId" INTEGER NOT NULL,
    "imei" TEXT,
    "serial" TEXT,
    "locked" TEXT,
    "lockType" TEXT,
    "status" TEXT,
    "isActivated" TEXT,
    "previousStatus" TEXT,
    "previousStatusChangedOn" TIMESTAMP(3),
    "make" TEXT,
    "model" TEXT,
    "type" TEXT,
    "deleted" TEXT,
    "activatedDeviceDeleted" TEXT,
    "registeredOn" TIMESTAMP(3),
    "enrolledOn" TIMESTAMP(3),
    "unregisteredOn" TIMESTAMP(3),
    "deletedOn" TIMESTAMP(3),
    "activationDate" TIMESTAMP(3),
    "billable" TEXT,
    "lastConnectedAt" TIMESTAMP(3),
    "nextLockDate" TIMESTAMP(3),
    "appVersion" TEXT,
    "customerEmail" TEXT NOT NULL,
    "enrolledOnOnlyDate" DATE,
    "billableCalculated" BOOLEAN,
    "customerName" TEXT NOT NULL,
    "skuStartCounter" INTEGER,
    "skuEndCounter" INTEGER
);

-- CreateIndex
CREATE UNIQUE INDEX "BlockingDeviceCompleteSku_deviceId_key" ON "BlockingDeviceCompleteSku"("deviceId");

-- CreateIndex
CREATE INDEX "BlockingDeviceCompleteSku_type_customerEmail_enrolledOnOnly_idx" ON "BlockingDeviceCompleteSku"("type", "customerEmail", "enrolledOnOnlyDate", "billableCalculated");

-- CreateIndex
CREATE INDEX "ActivationReport_customerName_deviceType_idx" ON "ActivationReport"("customerName", "deviceType");
