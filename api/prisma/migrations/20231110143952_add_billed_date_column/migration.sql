-- AlterTable
ALTER TABLE "BlockingDeviceCustomerReport" ADD COLUMN     "billedDate" DATE;

-- AlterTable
ALTER TABLE "BlockingDeviceDataRaw" ADD COLUMN     "billedDate" DATE;

-- AlterTable
ALTER TABLE "BlockingDeviceDataStepOne" ADD COLUMN     "billedDate" DATE;

-- AlterTable
ALTER TABLE "BlockingDeviceDataStepTwo" ADD COLUMN     "billedDate" DATE;

-- AlterTable
ALTER TABLE "BlockingDeviceDataStepTwoBackup" ADD COLUMN     "billedDate" DATE;
