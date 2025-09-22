-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "branchId" TEXT,
ADD COLUMN     "cellPhone" TEXT,
ADD COLUMN     "companieCnpj" TEXT,
ADD COLUMN     "companieName" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'member',
ADD COLUMN     "unitId" TEXT;

-- CreateTable
CREATE TABLE "public"."businesses" (
    "id" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "operation" INTEGER NOT NULL,
    "type" INTEGER NOT NULL,
    "name" TEXT,
    "cnpjCpf" TEXT,
    "cellPhone" TEXT,
    "email" TEXT,
    "description" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "pointsChecked" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "businesses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."levels" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "levels_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "levels_slug_key" ON "public"."levels"("slug");

-- AddForeignKey
ALTER TABLE "public"."businesses" ADD CONSTRAINT "businesses_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
