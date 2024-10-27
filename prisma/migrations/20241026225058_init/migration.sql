-- CreateTable
CREATE TABLE "City" (
    "id" SERIAL NOT NULL,
    "uf" TEXT NOT NULL,
    "ufCod" TEXT NOT NULL,
    "munCod" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "population" TEXT NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);
