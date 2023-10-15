-- CreateTable
CREATE TABLE "Catalog" (
    "idCatalog" SERIAL NOT NULL,
    "typeCatalog" TEXT NOT NULL,
    "nameCatalog" TEXT NOT NULL,
    "creationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifyDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "statusCatalog" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Catalog_pkey" PRIMARY KEY ("idCatalog")
);

-- CreateTable
CREATE TABLE "Account" (
    "idAccount" SERIAL NOT NULL,
    "userName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nameOne" TEXT NOT NULL,
    "nameSecond" TEXT NOT NULL,
    "lastNameOne" TEXT NOT NULL,
    "lasNameSecond" TEXT NOT NULL,
    "typeIdentification" INTEGER NOT NULL,
    "numIdentification" TEXT NOT NULL,
    "birthdate" TIMESTAMP(3) NOT NULL,
    "creationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifyDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "statusAccount" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("idAccount")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_userName_key" ON "Account"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "Account_numIdentification_key" ON "Account"("numIdentification");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_typeIdentification_fkey" FOREIGN KEY ("typeIdentification") REFERENCES "Catalog"("idCatalog") ON DELETE RESTRICT ON UPDATE CASCADE;
