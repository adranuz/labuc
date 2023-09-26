-- CreateTable
CREATE TABLE "BlockingDeviceConsolidatedHistory" (
    "id" SERIAL NOT NULL,
    "customerName" TEXT NOT NULL,
    "enrolldeDate" DATE,
    "billableDelta" INTEGER NOT NULL,

    CONSTRAINT "BlockingDeviceConsolidatedHistory_pkey" PRIMARY KEY ("id")
);
