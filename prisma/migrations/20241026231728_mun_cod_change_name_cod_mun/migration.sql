/*
  Warnings:

  - You are about to drop the column `munCod` on the `City` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[codMun]` on the table `City` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `codMun` to the `City` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "City_munCod_key";

-- AlterTable
ALTER TABLE "City" DROP COLUMN "munCod",
ADD COLUMN     "codMun" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "City_codMun_key" ON "City"("codMun");
