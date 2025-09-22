/*
  Warnings:

  - A unique constraint covering the columns `[laravelId]` on the table `Contract` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[laravelId]` on the table `Organization` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[laravelId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[laravelId]` on the table `businesses` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[laravelId]` on the table `levels` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[laravelId]` on the table `member_points` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."Contract" ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "birth" DATE,
ADD COLUMN     "laravelId" BIGINT,
ADD COLUMN     "logo" TEXT,
ADD COLUMN     "movie" TEXT,
ADD COLUMN     "nickname" TEXT,
ADD COLUMN     "userSlug" TEXT,
ADD COLUMN     "userStatus" BIGINT NOT NULL DEFAULT 0,
ADD COLUMN     "who" TEXT;

-- AlterTable
ALTER TABLE "public"."Organization" ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "birth" DATE,
ADD COLUMN     "laravelId" BIGINT,
ADD COLUMN     "logo" TEXT,
ADD COLUMN     "movie" TEXT,
ADD COLUMN     "nickname" TEXT,
ADD COLUMN     "userSlug" TEXT,
ADD COLUMN     "userStatus" BIGINT NOT NULL DEFAULT 0,
ADD COLUMN     "who" TEXT;

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "birth" DATE,
ADD COLUMN     "laravelId" BIGINT,
ADD COLUMN     "logo" TEXT,
ADD COLUMN     "movie" TEXT,
ADD COLUMN     "nickname" TEXT,
ADD COLUMN     "userSlug" TEXT,
ADD COLUMN     "userStatus" BIGINT NOT NULL DEFAULT 0,
ADD COLUMN     "who" TEXT;

-- AlterTable
ALTER TABLE "public"."businesses" ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "birth" DATE,
ADD COLUMN     "laravelId" BIGINT,
ADD COLUMN     "logo" TEXT,
ADD COLUMN     "movie" TEXT,
ADD COLUMN     "nickname" TEXT,
ADD COLUMN     "userSlug" TEXT,
ADD COLUMN     "userStatus" BIGINT NOT NULL DEFAULT 0,
ADD COLUMN     "who" TEXT;

-- AlterTable
ALTER TABLE "public"."levels" ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "birth" DATE,
ADD COLUMN     "laravelId" BIGINT,
ADD COLUMN     "logo" TEXT,
ADD COLUMN     "movie" TEXT,
ADD COLUMN     "nickname" TEXT,
ADD COLUMN     "userSlug" TEXT,
ADD COLUMN     "userStatus" BIGINT NOT NULL DEFAULT 0,
ADD COLUMN     "who" TEXT;

-- AlterTable
ALTER TABLE "public"."member_points" ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "birth" DATE,
ADD COLUMN     "laravelId" BIGINT,
ADD COLUMN     "logo" TEXT,
ADD COLUMN     "movie" TEXT,
ADD COLUMN     "nickname" TEXT,
ADD COLUMN     "userSlug" TEXT,
ADD COLUMN     "userStatus" BIGINT NOT NULL DEFAULT 0,
ADD COLUMN     "who" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Contract_laravelId_key" ON "public"."Contract"("laravelId");

-- CreateIndex
CREATE UNIQUE INDEX "Organization_laravelId_key" ON "public"."Organization"("laravelId");

-- CreateIndex
CREATE UNIQUE INDEX "User_laravelId_key" ON "public"."User"("laravelId");

-- CreateIndex
CREATE UNIQUE INDEX "businesses_laravelId_key" ON "public"."businesses"("laravelId");

-- CreateIndex
CREATE UNIQUE INDEX "levels_laravelId_key" ON "public"."levels"("laravelId");

-- CreateIndex
CREATE UNIQUE INDEX "member_points_laravelId_key" ON "public"."member_points"("laravelId");
