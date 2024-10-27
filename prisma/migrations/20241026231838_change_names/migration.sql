/*
  Warnings:

  - You are about to drop the column `name` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `population` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `ufCod` on the `City` table. All the data in the column will be lost.
  - Added the required column `codUf` to the `City` table without a default value. This is not possible if the table is not empty.
  - Added the required column `municipio` to the `City` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pop` to the `City` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "City" DROP COLUMN "name",
DROP COLUMN "population",
DROP COLUMN "ufCod",
ADD COLUMN     "codUf" TEXT NOT NULL,
ADD COLUMN     "municipio" TEXT NOT NULL,
ADD COLUMN     "pop" TEXT NOT NULL;
