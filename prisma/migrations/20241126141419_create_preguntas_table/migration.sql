/*
  Warnings:

  - You are about to drop the `Preguntas` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
CREATE SEQUENCE card_id_seq;
ALTER TABLE "Card" ALTER COLUMN "id" SET DEFAULT nextval('card_id_seq');
ALTER SEQUENCE card_id_seq OWNED BY "Card"."id";

-- DropTable
DROP TABLE "Preguntas";

-- CreateTable
CREATE TABLE "preguntas" (
    "id" SERIAL NOT NULL,
    "pregunta" TEXT NOT NULL,

    CONSTRAINT "preguntas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Info" (
    "id" SERIAL NOT NULL,
    "infografia" TEXT NOT NULL,

    CONSTRAINT "Info_pkey" PRIMARY KEY ("id")
);
