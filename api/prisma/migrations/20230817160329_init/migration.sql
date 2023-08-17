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

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NuovoReport" (
    "id" TEXT NOT NULL,
    "reportedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NuovoReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NuovoReportInfo" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NuovoReportInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NuovoReportLogProcess" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finishedAt" TIMESTAMP(3),
    "nuovoReportId" TEXT NOT NULL,

    CONSTRAINT "NuovoReportLogProcess_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NuovoReportLogFile" (
    "id" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nuovoReportId" TEXT NOT NULL,

    CONSTRAINT "NuovoReportLogFile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NuovoReportConsolidated" (
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
    "nuovoReportId" TEXT NOT NULL,

    CONSTRAINT "NuovoReportConsolidated_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlockingDevice" (
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
    "customerEmail" TEXT,
    "nuovoReportId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "BlockingDeviceComplete" (
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
    "nuovoReportId" TEXT NOT NULL,
    "enrolledOnOnlyDate" DATE,
    "billableCalculated" BOOLEAN
);

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
    "nuovoReportId" TEXT NOT NULL,
    "enrolledOnOnlyDate" DATE,
    "billableCalculated" BOOLEAN,
    "customerName" TEXT NOT NULL,
    "skuStartCounter" INTEGER,
    "skuEndCounter" INTEGER
);

-- CreateTable
CREATE TABLE "BlockingDeviceReport" (
    "deviceId" INTEGER NOT NULL,
    "imei" TEXT,
    "serial" TEXT,
    "locked" TEXT,
    "lockType" TEXT,
    "status" TEXT,
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
    "billableText" TEXT,
    "sku3mCounter" INTEGER,
    "skuStartCounter" INTEGER,
    "skuEndCounter" INTEGER
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
CREATE UNIQUE INDEX "NuovoReport_reportedAt_key" ON "NuovoReport"("reportedAt");

-- CreateIndex
CREATE UNIQUE INDEX "NuovoReportInfo_name_key" ON "NuovoReportInfo"("name");

-- CreateIndex
CREATE INDEX "NuovoReportConsolidated_customerName_deviceType_idx" ON "NuovoReportConsolidated"("customerName", "deviceType");

-- CreateIndex
CREATE UNIQUE INDEX "BlockingDevice_deviceId_key" ON "BlockingDevice"("deviceId");

-- CreateIndex
CREATE INDEX "BlockingDevice_billable_status_enrolledOn_idx" ON "BlockingDevice"("billable", "status", "enrolledOn");

-- CreateIndex
CREATE UNIQUE INDEX "BlockingDeviceComplete_deviceId_key" ON "BlockingDeviceComplete"("deviceId");

-- CreateIndex
CREATE INDEX "BlockingDeviceComplete_type_customerEmail_enrolledOnOnlyDat_idx" ON "BlockingDeviceComplete"("type", "customerEmail", "enrolledOnOnlyDate", "billableCalculated");

-- CreateIndex
CREATE UNIQUE INDEX "BlockingDeviceCompleteSku_deviceId_key" ON "BlockingDeviceCompleteSku"("deviceId");

-- CreateIndex
CREATE INDEX "BlockingDeviceCompleteSku_type_customerEmail_enrolledOnOnly_idx" ON "BlockingDeviceCompleteSku"("type", "customerEmail", "enrolledOnOnlyDate", "billableCalculated");

-- CreateIndex
CREATE UNIQUE INDEX "BlockingDeviceReport_deviceId_key" ON "BlockingDeviceReport"("deviceId");

-- CreateIndex
CREATE INDEX "BlockingDeviceReport_deviceId_idx" ON "BlockingDeviceReport"("deviceId");

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
ALTER TABLE "NuovoReportLogProcess" ADD CONSTRAINT "NuovoReportLogProcess_nuovoReportId_fkey" FOREIGN KEY ("nuovoReportId") REFERENCES "NuovoReport"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NuovoReportLogFile" ADD CONSTRAINT "NuovoReportLogFile_nuovoReportId_fkey" FOREIGN KEY ("nuovoReportId") REFERENCES "NuovoReport"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NuovoReportConsolidated" ADD CONSTRAINT "NuovoReportConsolidated_nuovoReportId_fkey" FOREIGN KEY ("nuovoReportId") REFERENCES "NuovoReport"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlockingDevice" ADD CONSTRAINT "BlockingDevice_nuovoReportId_fkey" FOREIGN KEY ("nuovoReportId") REFERENCES "NuovoReport"("id") ON DELETE CASCADE ON UPDATE CASCADE;

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
