-- AlterTable
ALTER TABLE "public"."Contract" ADD COLUMN     "allowsContact" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "amountEmployees" BIGINT,
ADD COLUMN     "companieDescription" TEXT,
ADD COLUMN     "companieInvoicing" DECIMAL(10,2),
ADD COLUMN     "funcCompanie" TEXT,
ADD COLUMN     "groupExpectation" TEXT,
ADD COLUMN     "listPartnershipsClients" TEXT,
ADD COLUMN     "specificActivity" TEXT,
ADD COLUMN     "timeAtuation" TEXT,
ADD COLUMN     "urgencySchedule" BIGINT;

-- AlterTable
ALTER TABLE "public"."Organization" ADD COLUMN     "allowsContact" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "amountEmployees" BIGINT,
ADD COLUMN     "companieDescription" TEXT,
ADD COLUMN     "companieInvoicing" DECIMAL(10,2),
ADD COLUMN     "funcCompanie" TEXT,
ADD COLUMN     "groupExpectation" TEXT,
ADD COLUMN     "listPartnershipsClients" TEXT,
ADD COLUMN     "specificActivity" TEXT,
ADD COLUMN     "timeAtuation" TEXT,
ADD COLUMN     "urgencySchedule" BIGINT;

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "allowsContact" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "amountEmployees" BIGINT,
ADD COLUMN     "companieDescription" TEXT,
ADD COLUMN     "companieInvoicing" DECIMAL(10,2),
ADD COLUMN     "funcCompanie" TEXT,
ADD COLUMN     "groupExpectation" TEXT,
ADD COLUMN     "listPartnershipsClients" TEXT,
ADD COLUMN     "specificActivity" TEXT,
ADD COLUMN     "timeAtuation" TEXT,
ADD COLUMN     "urgencySchedule" BIGINT;

-- AlterTable
ALTER TABLE "public"."businesses" ADD COLUMN     "allowsContact" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "amountEmployees" BIGINT,
ADD COLUMN     "companieDescription" TEXT,
ADD COLUMN     "companieInvoicing" DECIMAL(10,2),
ADD COLUMN     "funcCompanie" TEXT,
ADD COLUMN     "groupExpectation" TEXT,
ADD COLUMN     "listPartnershipsClients" TEXT,
ADD COLUMN     "specificActivity" TEXT,
ADD COLUMN     "timeAtuation" TEXT,
ADD COLUMN     "urgencySchedule" BIGINT;

-- AlterTable
ALTER TABLE "public"."levels" ADD COLUMN     "allowsContact" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "amountEmployees" BIGINT,
ADD COLUMN     "companieDescription" TEXT,
ADD COLUMN     "companieInvoicing" DECIMAL(10,2),
ADD COLUMN     "funcCompanie" TEXT,
ADD COLUMN     "groupExpectation" TEXT,
ADD COLUMN     "listPartnershipsClients" TEXT,
ADD COLUMN     "specificActivity" TEXT,
ADD COLUMN     "timeAtuation" TEXT,
ADD COLUMN     "urgencySchedule" BIGINT;

-- AlterTable
ALTER TABLE "public"."member_points" ADD COLUMN     "allowsContact" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "amountEmployees" BIGINT,
ADD COLUMN     "companieDescription" TEXT,
ADD COLUMN     "companieInvoicing" DECIMAL(10,2),
ADD COLUMN     "funcCompanie" TEXT,
ADD COLUMN     "groupExpectation" TEXT,
ADD COLUMN     "listPartnershipsClients" TEXT,
ADD COLUMN     "specificActivity" TEXT,
ADD COLUMN     "timeAtuation" TEXT,
ADD COLUMN     "urgencySchedule" BIGINT;
