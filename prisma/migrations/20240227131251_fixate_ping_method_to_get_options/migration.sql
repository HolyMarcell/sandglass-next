/*
  Warnings:

  - Changed the type of `method` on the `Ping` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "PingMethod" AS ENUM ('GET', 'OPTIONS');

-- AlterTable
ALTER TABLE "Ping"
    ALTER COLUMN     "method" TYPE "PingMethod" USING method::"PingMethod";
