-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Permission" (
    "id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "shortName" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "customId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "registeredName" TEXT NOT NULL,
    "rfc" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "economicActivity" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "sellerName" TEXT NOT NULL,
    "sellerComments" TEXT NOT NULL,
    "comissionTerm" TEXT NOT NULL,
    "percentageComissions" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "devices" TEXT[],
    "skuStart" TEXT,
    "skuEnd" TEXT,
    "sku3m" BOOLEAN NOT NULL DEFAULT false,
    "skuHBMF" BOOLEAN NOT NULL DEFAULT false,
    "skuHBMPRE" BOOLEAN NOT NULL DEFAULT false,
    "dbName" TEXT,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlockingDeviceImport" (
    "id" TEXT NOT NULL,
    "reportedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BlockingDeviceImport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlockingDeviceVariable" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BlockingDeviceVariable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlockingDeviceImportLogProcess" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finishedAt" TIMESTAMP(3),
    "blockingDeviceImportId" TEXT NOT NULL,

    CONSTRAINT "BlockingDeviceImportLogProcess_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlockingDeviceImportLogFile" (
    "id" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "blockingDeviceImportId" TEXT NOT NULL,

    CONSTRAINT "BlockingDeviceImportLogFile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlockingDeviceConsolidatedReport" (
    "id" TEXT NOT NULL,
    "customerName" TEXT NOT NULL,
    "customerEmail" TEXT NOT NULL,
    "billable" INTEGER NOT NULL,
    "nonBillable" INTEGER NOT NULL,
    "billableWeekly" INTEGER NOT NULL,
    "nonBillableWeekly" INTEGER NOT NULL,
    "billableBiweekly" INTEGER NOT NULL,
    "nonBillableBiweekly" INTEGER NOT NULL,
    "deviceType" TEXT NOT NULL,
    "skuStartCounter" INTEGER NOT NULL,
    "skuEndCounter" INTEGER NOT NULL,
    "blockingDeviceImportId" TEXT NOT NULL,

    CONSTRAINT "BlockingDeviceConsolidatedReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlockingDeviceDataRaw" (
    "customerId" TEXT,
    "deviceId" INTEGER NOT NULL,
    "imei" TEXT,
    "serial" TEXT,
    "locked" TEXT,
    "expectedLockStatus" TEXT,
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
    "gettingStartedClicked" TEXT,
    "additionalSetupCompleted" TEXT,
    "customerEmail" TEXT,
    "blockingDeviceImportId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "BlockingDeviceDataStepOne" (
    "customerId" TEXT,
    "deviceId" INTEGER NOT NULL,
    "imei" TEXT,
    "serial" TEXT,
    "locked" TEXT,
    "expectedLockStatus" TEXT,
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
    "gettingStartedClicked" TEXT,
    "additionalSetupCompleted" TEXT,
    "customerEmail" TEXT NOT NULL,
    "blockingDeviceImportId" TEXT NOT NULL,
    "enrolledOnOnlyDate" DATE,
    "billableCalculated" BOOLEAN
);

-- CreateTable
CREATE TABLE "BlockingDeviceDataStepTwo" (
    "customerId" TEXT,
    "deviceId" INTEGER NOT NULL,
    "imei" TEXT,
    "serial" TEXT,
    "locked" TEXT,
    "expectedLockStatus" TEXT,
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
    "gettingStartedClicked" TEXT,
    "additionalSetupCompleted" TEXT,
    "customerEmail" TEXT NOT NULL,
    "blockingDeviceImportId" TEXT NOT NULL,
    "enrolledOnOnlyDate" DATE,
    "billableCalculated" BOOLEAN,
    "customerName" TEXT NOT NULL,
    "skuStartCounter" INTEGER,
    "skuEndCounter" INTEGER
);

-- CreateTable
CREATE TABLE "BlockingDeviceDataStepTwoBackup" (
    "customerId" TEXT,
    "deviceId" INTEGER NOT NULL,
    "imei" TEXT,
    "serial" TEXT,
    "locked" TEXT,
    "expectedLockStatus" TEXT,
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
    "gettingStartedClicked" TEXT,
    "additionalSetupCompleted" TEXT,
    "customerEmail" TEXT NOT NULL,
    "blockingDeviceImportId" TEXT NOT NULL,
    "enrolledOnOnlyDate" DATE,
    "billableCalculated" BOOLEAN,
    "customerName" TEXT NOT NULL,
    "skuStartCounter" INTEGER,
    "skuEndCounter" INTEGER
);

-- CreateTable
CREATE TABLE "BlockingDeviceCustomerReport" (
    "deviceId" INTEGER NOT NULL,
    "imei" TEXT,
    "serial" TEXT,
    "locked" TEXT,
    "expectedLockStatus" TEXT,
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
    "gettingStartedClicked" TEXT,
    "additionalSetupCompleted" TEXT,
    "billableText" TEXT,
    "sku3mCounter" INTEGER,
    "skuStartCounter" INTEGER,
    "skuEndCounter" INTEGER
);

-- CreateTable
CREATE TABLE "PacCreditReport" (
    "id" INTEGER NOT NULL,
    "client" TEXT,
    "general_count" INTEGER,
    "status_count" JSONB,
    "success_score" INTEGER,
    "error_score" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PacCreditReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_RoleToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_PermissionToRole" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CustomerToProduct" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE INDEX "Role_id_idx" ON "Role"("id");

-- CreateIndex
CREATE INDEX "Role_name_idx" ON "Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Permission_action_key" ON "Permission"("action");

-- CreateIndex
CREATE INDEX "Permission_id_idx" ON "Permission"("id");

-- CreateIndex
CREATE INDEX "Permission_action_idx" ON "Permission"("action");

-- CreateIndex
CREATE UNIQUE INDEX "Product_shortName_key" ON "Product"("shortName");

-- CreateIndex
CREATE INDEX "Product_id_idx" ON "Product"("id");

-- CreateIndex
CREATE INDEX "Contact_id_idx" ON "Contact"("id");

-- CreateIndex
CREATE INDEX "Customer_id_email_idx" ON "Customer"("id", "email");

-- CreateIndex
CREATE UNIQUE INDEX "BlockingDeviceImport_reportedAt_key" ON "BlockingDeviceImport"("reportedAt");

-- CreateIndex
CREATE UNIQUE INDEX "BlockingDeviceVariable_name_key" ON "BlockingDeviceVariable"("name");

-- CreateIndex
CREATE INDEX "BlockingDeviceConsolidatedReport_customerName_deviceType_bl_idx" ON "BlockingDeviceConsolidatedReport"("customerName", "deviceType", "blockingDeviceImportId");

-- CreateIndex
CREATE UNIQUE INDEX "BlockingDeviceDataRaw_deviceId_key" ON "BlockingDeviceDataRaw"("deviceId");

-- CreateIndex
CREATE INDEX "BlockingDeviceDataRaw_billable_status_enrolledOn_idx" ON "BlockingDeviceDataRaw"("billable", "status", "enrolledOn");

-- CreateIndex
CREATE UNIQUE INDEX "BlockingDeviceDataStepOne_deviceId_key" ON "BlockingDeviceDataStepOne"("deviceId");

-- CreateIndex
CREATE INDEX "BlockingDeviceDataStepOne_type_customerEmail_enrolledOnOnly_idx" ON "BlockingDeviceDataStepOne"("type", "customerEmail", "enrolledOnOnlyDate", "billableCalculated");

-- CreateIndex
CREATE UNIQUE INDEX "BlockingDeviceDataStepTwo_deviceId_key" ON "BlockingDeviceDataStepTwo"("deviceId");

-- CreateIndex
CREATE INDEX "BlockingDeviceDataStepTwo_type_customerEmail_enrolledOnOnly_idx" ON "BlockingDeviceDataStepTwo"("type", "customerEmail", "enrolledOnOnlyDate", "billableCalculated", "blockingDeviceImportId");

-- CreateIndex
CREATE UNIQUE INDEX "BlockingDeviceDataStepTwoBackup_deviceId_key" ON "BlockingDeviceDataStepTwoBackup"("deviceId");

-- CreateIndex
CREATE INDEX "BlockingDeviceDataStepTwoBackup_type_customerEmail_enrolled_idx" ON "BlockingDeviceDataStepTwoBackup"("type", "customerEmail", "enrolledOnOnlyDate", "billableCalculated", "blockingDeviceImportId");

-- CreateIndex
CREATE UNIQUE INDEX "BlockingDeviceCustomerReport_deviceId_key" ON "BlockingDeviceCustomerReport"("deviceId");

-- CreateIndex
CREATE INDEX "BlockingDeviceCustomerReport_deviceId_idx" ON "BlockingDeviceCustomerReport"("deviceId");

-- CreateIndex
CREATE UNIQUE INDEX "_RoleToUser_AB_unique" ON "_RoleToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_RoleToUser_B_index" ON "_RoleToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PermissionToRole_AB_unique" ON "_PermissionToRole"("A", "B");

-- CreateIndex
CREATE INDEX "_PermissionToRole_B_index" ON "_PermissionToRole"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CustomerToProduct_AB_unique" ON "_CustomerToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_CustomerToProduct_B_index" ON "_CustomerToProduct"("B");

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlockingDeviceImportLogProcess" ADD CONSTRAINT "BlockingDeviceImportLogProcess_blockingDeviceImportId_fkey" FOREIGN KEY ("blockingDeviceImportId") REFERENCES "BlockingDeviceImport"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlockingDeviceImportLogFile" ADD CONSTRAINT "BlockingDeviceImportLogFile_blockingDeviceImportId_fkey" FOREIGN KEY ("blockingDeviceImportId") REFERENCES "BlockingDeviceImport"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlockingDeviceConsolidatedReport" ADD CONSTRAINT "BlockingDeviceConsolidatedReport_blockingDeviceImportId_fkey" FOREIGN KEY ("blockingDeviceImportId") REFERENCES "BlockingDeviceImport"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlockingDeviceDataRaw" ADD CONSTRAINT "BlockingDeviceDataRaw_blockingDeviceImportId_fkey" FOREIGN KEY ("blockingDeviceImportId") REFERENCES "BlockingDeviceImport"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoleToUser" ADD CONSTRAINT "_RoleToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoleToUser" ADD CONSTRAINT "_RoleToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PermissionToRole" ADD CONSTRAINT "_PermissionToRole_A_fkey" FOREIGN KEY ("A") REFERENCES "Permission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PermissionToRole" ADD CONSTRAINT "_PermissionToRole_B_fkey" FOREIGN KEY ("B") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CustomerToProduct" ADD CONSTRAINT "_CustomerToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CustomerToProduct" ADD CONSTRAINT "_CustomerToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
