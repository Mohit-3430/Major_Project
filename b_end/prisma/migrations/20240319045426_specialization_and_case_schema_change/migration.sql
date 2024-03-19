/*
  Warnings:

  - You are about to drop the column `clientId` on the `Case` table. All the data in the column will be lost.
  - You are about to drop the column `lawyerId` on the `Case` table. All the data in the column will be lost.
  - Added the required column `clientMail` to the `Case` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lawyerMail` to the `Case` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Specialization" AS ENUM ('Banking_and_Finance_Law', 'Civil_Litigation_and_Dispute_Law', 'Corporate_Law', 'Constitutional_Law', 'Consumer_Protection_Law', 'Criminal_Law', 'Family_Law', 'Human_Rights_Law', 'Intellectual_Property_Law', 'Property_Law', 'Tax_Law');

-- DropForeignKey
ALTER TABLE "Case" DROP CONSTRAINT "Case_clientId_fkey";

-- DropForeignKey
ALTER TABLE "Case" DROP CONSTRAINT "Case_lawyerId_fkey";

-- DropIndex
DROP INDEX "Case_clientId_idx";

-- DropIndex
DROP INDEX "Case_lawyerId_idx";

-- AlterTable
ALTER TABLE "Case" DROP COLUMN "clientId",
DROP COLUMN "lawyerId",
ADD COLUMN     "clientMail" TEXT NOT NULL,
ADD COLUMN     "lawyerMail" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "Specializations" "Specialization"[];

-- CreateIndex
CREATE INDEX "Case_lawyerMail_idx" ON "Case"("lawyerMail");

-- CreateIndex
CREATE INDEX "Case_clientMail_idx" ON "Case"("clientMail");

-- AddForeignKey
ALTER TABLE "Case" ADD CONSTRAINT "Case_lawyerMail_fkey" FOREIGN KEY ("lawyerMail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Case" ADD CONSTRAINT "Case_clientMail_fkey" FOREIGN KEY ("clientMail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
