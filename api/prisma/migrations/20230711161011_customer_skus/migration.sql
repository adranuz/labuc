-- AlterTable
ALTER TABLE "BlockingDeviceReport" ADD COLUMN     "enrolledOnCount3Months" INTEGER;

-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "devices" TEXT[],
ADD COLUMN     "sku3m" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "skuEnd" TEXT,
ADD COLUMN     "skuHBMF" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "skuHBMPRE" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "skuStart" TEXT,
ALTER COLUMN "comissionTerm" SET DATA TYPE TEXT;
