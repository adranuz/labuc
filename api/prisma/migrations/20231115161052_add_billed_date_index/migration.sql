-- DropIndex
DROP INDEX "BlockingDeviceDataStepOne_type_customerEmail_enrolledOnOnly_idx";

-- DropIndex
DROP INDEX "BlockingDeviceDataStepTwo_type_customerName_customerEmail_e_idx";

-- DropIndex
DROP INDEX "BlockingDeviceDataStepTwoBackup_type_customerEmail_enrolled_idx";

-- CreateIndex
CREATE INDEX "BlockingDeviceDataStepOne_type_customerEmail_billedDate_bil_idx" ON "BlockingDeviceDataStepOne"("type", "customerEmail", "billedDate", "billableCalculated");

-- CreateIndex
CREATE INDEX "BlockingDeviceDataStepTwo_type_customerName_customerEmail_b_idx" ON "BlockingDeviceDataStepTwo"("type", "customerName", "customerEmail", "billedDate", "billableCalculated", "blockingDeviceImportId");

-- CreateIndex
CREATE INDEX "BlockingDeviceDataStepTwoBackup_type_customerEmail_billedDa_idx" ON "BlockingDeviceDataStepTwoBackup"("type", "customerEmail", "billedDate", "billableCalculated", "blockingDeviceImportId");
