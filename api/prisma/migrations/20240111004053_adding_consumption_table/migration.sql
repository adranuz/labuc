-- CreateTable
CREATE TABLE "Consumption" (
    "id" TEXT NOT NULL,
    "data" JSONB NOT NULL,

    CONSTRAINT "Consumption_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Consumption_id_idx" ON "Consumption"("id");
