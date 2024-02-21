/*
  Warnings:

  - Changed the type of `status` on the `PingResult` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable

ALTER TABLE "PingResult"
    ALTER COLUMN "status" TYPE "PingResultStatus" USING "status"::"PingResultStatus";
