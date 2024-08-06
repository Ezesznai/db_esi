const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require('express'); // Suponiendo que uses Express para tu servidor
const app = express.Router();
app.use(express.json());

// Ruta para gestionar Card
app.post('/', async (req, res) => {
  const { img } = req.body;
  try {
    const newCard = await prisma.card.create({
      data: { img },
    });
    res.status(201).json(newCard);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el Card' });
  }
});

export default async (req, res) => {
  if (req.method === 'GET') {
    try {
      // Recuperar todas las palabras de la tabla PuzzleWord
      const words = await prisma.puzzleWord.findMany({
        select: {
          id: true,
          word: true,
        },
      });

      // Enviar la respuesta con las palabras
      res.status(200).json(words);
    } catch (error) {
      // Manejo de errores
      console.error('Error al recuperar las palabras:', error);
      res.status(500).json({ error: 'Error al recuperar las palabras' });
    }
  } else {
    // Manejo de métodos no permitidos
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};