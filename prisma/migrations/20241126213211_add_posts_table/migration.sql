/*
  Warnings:

  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - Made the column `content` on table `Post` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "content" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "email",
ALTER COLUMN "name" SET NOT NULL;

-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "score_mt" INTEGER NOT NULL,
    "tiempo_sp" INTEGER NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);
