-- CreateEnum
CREATE TYPE "public"."PointCategory" AS ENUM ('ATTENDANCE', 'MEETING', 'VISITOR', 'RECOMMENDATION', 'BUSINESS_DEAL');

-- CreateEnum
CREATE TYPE "public"."PointTransactionType" AS ENUM ('EARNED', 'PENALTY', 'BONUS');

-- AlterTable
ALTER TABLE "public"."Class" ADD COLUMN     "metadata" JSONB;

-- AlterTable
ALTER TABLE "public"."Event" ADD COLUMN     "metadata" JSONB;

-- CreateTable
CREATE TABLE "public"."member_points" (
    "id" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "totalPoints" INTEGER NOT NULL DEFAULT 0,
    "monthlyPoints" INTEGER NOT NULL DEFAULT 0,
    "yearlyPoints" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "member_points_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."point_transactions" (
    "id" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "points" INTEGER NOT NULL,
    "category" "public"."PointCategory" NOT NULL,
    "type" "public"."PointTransactionType" NOT NULL,
    "description" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "point_transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."meetings" (
    "id" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "type" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "meetings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."member_visits" (
    "id" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "visitorName" TEXT NOT NULL,
    "visitDate" TIMESTAMP(3) NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "member_visits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."recommendations" (
    "id" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "recommendedName" TEXT NOT NULL,
    "recommendedEmail" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "closedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "recommendations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."point_rules" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "minimal" TEXT,
    "type" INTEGER NOT NULL DEFAULT 2,
    "items" INTEGER NOT NULL DEFAULT 1,
    "points" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "point_rules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."member_metrics" (
    "id" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "eventsAttended" INTEGER NOT NULL DEFAULT 0,
    "meetingsHeld" INTEGER NOT NULL DEFAULT 0,
    "visitorsReferred" INTEGER NOT NULL DEFAULT 0,
    "recommendationsMade" INTEGER NOT NULL DEFAULT 0,
    "recommendationsClosed" INTEGER NOT NULL DEFAULT 0,
    "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "member_metrics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "member_points_memberId_key" ON "public"."member_points"("memberId");

-- CreateIndex
CREATE UNIQUE INDEX "member_metrics_memberId_key" ON "public"."member_metrics"("memberId");

-- AddForeignKey
ALTER TABLE "public"."member_points" ADD CONSTRAINT "member_points_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."point_transactions" ADD CONSTRAINT "point_transactions_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."meetings" ADD CONSTRAINT "meetings_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."member_visits" ADD CONSTRAINT "member_visits_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."recommendations" ADD CONSTRAINT "recommendations_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."member_metrics" ADD CONSTRAINT "member_metrics_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
