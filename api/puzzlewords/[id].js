import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  if (method === 'GET') {
    try {
      const puzzleWord = await prisma.puzzleWord.findUnique({
        where: { id: parseInt(id, 10) },
        select: {
          word: true,
        },
      });

      if (puzzleWord) {
        res.status(200).json(puzzleWord);
      } else {
        res.status(404).json({ message: `PuzzleWord with id ${id} not found` });
      }
    } catch (error) {
      console.error('Error retrieving puzzle word:', error);
      res.status(500).json({ error: 'Error retrieving puzzle word' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
};
