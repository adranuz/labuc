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
    "comissionTerm" TIMESTAMP(3) NOT NULL,
    "percentageComissions" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
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
    "previousStatusChangedOn" DATE,
    "make" TEXT,
    "model" TEXT,
    "type" TEXT,
    "deleted" TEXT,
    "activatedDeviceDeleted" TEXT,
    "registeredOn" DATE,
    "enrolledOn" DATE,
    "unregisteredOn" DATE,
    "deletedOn" DATE,
    "activationDate" DATE,
    "billable" TEXT,
    "lastConnectedAt" DATE,
    "nextLockDate" DATE,
    "appVersion" TEXT,
    "customerEmail" TEXT
);

-- CreateTable
CREATE TABLE "ActivationReport" (
    "id" TEXT NOT NULL,
    "customerName" TEXT NOT NULL,
    "customerEmail" TEXT NOT NULL,
    "billable" INTEGER NOT NULL,
    "nonBillable" INTEGER NOT NULL,
    "billableWeekly" INTEGER NOT NULL,
    "nonBillableWeekly" INTEGER NOT NULL,
    "billableBiweekly" INTEGER NOT NULL,
    "nonBillableBiweekly" INTEGER NOT NULL,

    CONSTRAINT "ActivationReport_pkey" PRIMARY KEY ("id")
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
    "previousStatusChangedOn" DATE,
    "make" TEXT,
    "model" TEXT,
    "type" TEXT,
    "deleted" TEXT,
    "activatedDeviceDeleted" TEXT,
    "registeredOn" DATE,
    "enrolledOn" DATE,
    "unregisteredOn" DATE,
    "deletedOn" DATE,
    "activationDate" DATE,
    "billable" TEXT,
    "billableText" TEXT
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
CREATE UNIQUE INDEX "BlockingDevice_deviceId_key" ON "BlockingDevice"("deviceId");

-- CreateIndex
CREATE INDEX "BlockingDevice_billable_status_enrolledOn_customerEmail_idx" ON "BlockingDevice"("billable", "status", "enrolledOn", "customerEmail");

-- CreateIndex
CREATE INDEX "ActivationReport_customerEmail_idx" ON "ActivationReport"("customerEmail");

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
