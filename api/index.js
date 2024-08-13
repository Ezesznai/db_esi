import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import express from 'express';
const app = express.Router();
app.use(express.json());

// Ruta para gestionar Card (Este código es específico para una tabla diferente, pero lo mantendré como está)
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

// Ruta para gestionar PuzzleWords
export default async (req, res) => {
  if (req.method === 'GET') {
    try {
      // Recuperar todas las palabras de la tabla PuzzleWord
      const words = await prisma.puzzleWord.findMany({
        select: {
          id: true,
          word: true, // Aquí se espera que 'word' sea un JSON
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



/*

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import express from 'express';
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

/*