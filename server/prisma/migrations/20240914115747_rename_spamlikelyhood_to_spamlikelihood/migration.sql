/*
  Warnings:

  - You are about to drop the column `spamLikelyHood` on the `GlobalPhoneBook` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "GlobalPhoneBook" DROP COLUMN "spamLikelyHood",
ADD COLUMN     "spamLikeliHood" DOUBLE PRECISION NOT NULL DEFAULT 0.0;
