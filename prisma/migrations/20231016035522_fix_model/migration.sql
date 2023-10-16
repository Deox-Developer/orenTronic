/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeRole` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "typeRole" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Permissions" (
    "idPermission" SERIAL NOT NULL,
    "idRole" INTEGER NOT NULL,
    "module" TEXT NOT NULL,
    "typePermission" TEXT NOT NULL,
    "creationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifyDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "statusPermission" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Permissions_pkey" PRIMARY KEY ("idPermission")
);

-- CreateIndex
CREATE UNIQUE INDEX "Permissions_typePermission_key" ON "Permissions"("typePermission");

-- CreateIndex
CREATE UNIQUE INDEX "Account_email_key" ON "Account"("email");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_typeRole_fkey" FOREIGN KEY ("typeRole") REFERENCES "Permissions"("idPermission") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Permissions" ADD CONSTRAINT "Permissions_idRole_fkey" FOREIGN KEY ("idRole") REFERENCES "Catalog"("idCatalog") ON DELETE RESTRICT ON UPDATE CASCADE;
