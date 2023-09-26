-- DropIndex
DROP INDEX "BlockingDeviceDataStepTwo_type_customerEmail_enrolledOnOnly_idx";

-- CreateIndex
CREATE INDEX "BlockingDeviceDataStepTwo_type_customerName_customerEmail_e_idx" ON "BlockingDeviceDataStepTwo"("type", "customerName", "customerEmail", "enrolledOnOnlyDate", "billableCalculated", "blockingDeviceImportId");
