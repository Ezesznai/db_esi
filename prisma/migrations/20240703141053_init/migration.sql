-- CreateTable
CREATE TABLE "Word" (
    "id" SERIAL NOT NULL,
    "word" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Word_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PuzzleWord" (
    "id" SERIAL NOT NULL,
    "respeto" TEXT NOT NULL,
    "amistad" TEXT NOT NULL,

    CONSTRAINT "PuzzleWord_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Word_word_key" ON "Word"("word");
