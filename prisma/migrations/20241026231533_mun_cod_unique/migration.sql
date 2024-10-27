/*
  Warnings:

  - A unique constraint covering the columns `[munCod]` on the table `City` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "City_munCod_key" ON "City"("munCod");
