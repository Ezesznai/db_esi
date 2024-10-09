/*
  Warnings:

  - You are about to drop the column `amistad` on the `PuzzleWord` table. All the data in the column will be lost.
  - You are about to drop the column `respeto` on the `PuzzleWord` table. All the data in the column will be lost.
  - You are about to drop the `Word` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `word` to the `PuzzleWord` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Card" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "Card_id_seq";

-- AlterTable
ALTER TABLE "PuzzleWord" DROP COLUMN "amistad",
DROP COLUMN "respeto",
ADD COLUMN     "word" JSONB NOT NULL;

-- DropTable
DROP TABLE "Word";

-- CreateTable
CREATE TABLE "Preguntas" (
    "id" INTEGER NOT NULL,
    "pregunta" TEXT NOT NULL,

    CONSTRAINT "Preguntas_pkey" PRIMARY KEY ("id")
);
