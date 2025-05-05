/*
  Warnings:

  - You are about to drop the column `kuota` on the `Event` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "kuota",
ADD COLUMN     "quota" INTEGER NOT NULL DEFAULT 0;
