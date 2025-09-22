-- AlterTable
ALTER TABLE "public"."Event" ADD COLUMN     "unitsId" TEXT;

-- CreateTable
CREATE TABLE "public"."Unit" (
    "id" TEXT NOT NULL,
    "laravelId" BIGINT,
    "type" BIGINT NOT NULL,
    "name" TEXT NOT NULL,
    "responsibleName" TEXT NOT NULL,
    "responsibleCpf" TEXT,
    "responsibleEmail" TEXT NOT NULL,
    "responsibleCellPhone" TEXT NOT NULL,
    "companieLegalName" TEXT NOT NULL,
    "companieCnpj" TEXT NOT NULL,
    "companieTaxation" BIGINT NOT NULL,
    "companieShareCapital" TEXT NOT NULL,
    "companieName" TEXT NOT NULL,
    "companieCpf" TEXT,
    "address" TEXT,
    "number" TEXT,
    "complement" TEXT,
    "district" TEXT,
    "zipCode" TEXT,
    "countriesId" BIGINT NOT NULL,
    "statesId" BIGINT NOT NULL,
    "citiesId" BIGINT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "usersAt" TEXT,
    "usersDeletedAt" TEXT,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Unit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Unit_laravelId_key" ON "public"."Unit"("laravelId");

-- AddForeignKey
ALTER TABLE "public"."User" ADD CONSTRAINT "User_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "public"."Unit"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Event" ADD CONSTRAINT "Event_unitsId_fkey" FOREIGN KEY ("unitsId") REFERENCES "public"."Unit"("id") ON DELETE SET NULL ON UPDATE CASCADE;
