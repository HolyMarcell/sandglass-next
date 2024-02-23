/*
  Warnings:

  - Added the required column `userId` to the `Ping` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `PingResult` table without a default value. This is not possible if the table is not empty.

*/


TRUNCATE TABLE "PingResult", "Ping";

-- AlterTable
ALTER TABLE "Ping" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PingResult" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Ping" ADD CONSTRAINT "Ping_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PingResult" ADD CONSTRAINT "PingResult_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
