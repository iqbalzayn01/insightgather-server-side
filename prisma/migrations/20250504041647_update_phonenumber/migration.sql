/*
  Warnings:

  - You are about to drop the column `no_telp` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[phoneNumber]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `phoneNumber` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_no_telp_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "no_telp",
ADD COLUMN     "phoneNumber" VARCHAR(14) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNumber_key" ON "User"("phoneNumber");
