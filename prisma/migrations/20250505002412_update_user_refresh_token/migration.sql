/*
  Warnings:

  - The primary key for the `UserRefreshToken` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "UserRefreshToken" DROP CONSTRAINT "UserRefreshToken_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "UserRefreshToken_pkey" PRIMARY KEY ("id");
