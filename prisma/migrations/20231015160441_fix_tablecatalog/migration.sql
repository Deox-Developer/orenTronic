/*
  Warnings:

  - A unique constraint covering the columns `[nameCatalog]` on the table `Catalog` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Catalog_nameCatalog_key" ON "Catalog"("nameCatalog");
