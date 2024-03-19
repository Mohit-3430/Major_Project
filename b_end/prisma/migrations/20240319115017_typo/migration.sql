/*
  Warnings:

  - You are about to drop the column `Specializations` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "Specializations",
ADD COLUMN     "specializations" "Specialization"[];
