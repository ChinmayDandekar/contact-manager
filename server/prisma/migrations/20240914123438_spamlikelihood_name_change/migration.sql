/*
  Warnings:

  - You are about to drop the column `spamLikeliHood` on the `GlobalPhoneBook` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "GlobalPhoneBook" DROP COLUMN "spamLikeliHood",
ADD COLUMN     "spamLikelihood" DOUBLE PRECISION NOT NULL DEFAULT 0.0;
