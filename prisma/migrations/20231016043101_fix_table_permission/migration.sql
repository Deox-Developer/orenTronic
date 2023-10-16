/*
  Warnings:

  - You are about to drop the `Permissions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_typeRole_fkey";

-- DropForeignKey
ALTER TABLE "Permissions" DROP CONSTRAINT "Permissions_idRole_fkey";

-- DropTable
DROP TABLE "Permissions";

-- CreateTable
CREATE TABLE "Permission" (
    "idPermission" SERIAL NOT NULL,
    "idRole" INTEGER NOT NULL,
    "module" TEXT NOT NULL,
    "typePermission" TEXT NOT NULL,
    "creationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifyDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "statusPermission" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("idPermission")
);

-- CreateIndex
CREATE UNIQUE INDEX "Permission_typePermission_key" ON "Permission"("typePermission");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_typeRole_fkey" FOREIGN KEY ("typeRole") REFERENCES "Permission"("idPermission") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Permission" ADD CONSTRAINT "Permission_idRole_fkey" FOREIGN KEY ("idRole") REFERENCES "Catalog"("idCatalog") ON DELETE RESTRICT ON UPDATE CASCADE;
