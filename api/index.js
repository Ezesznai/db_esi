/*
const express = require("express");
const cors = require("cors");
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 3000;
app.use(cors({
  origin: 'https://db-esi.vercel.app'
}));

console.log(`server on port ${3000}`);

// Datos iniciales
const cards = [
  { id: 1, img: 'C:/Users/47653943/Desktop/backend/memotest/1' },
  { id: 2, img: 'C:/Users/47653943/Desktop/backend/memotest/2' },
  { id: 3, img: 'C:/Users/47653943/Desktop/backend/memotest/3' },
  { id: 1, img: 'C:/Users/47653943/Desktop/backend/memotest/1' },
  { id: 2, img: 'C:/Users/47653943/Desktop/backend/memotest/2' },
  { id: 3, img: 'C:/Users/47653943/Desktop/backend/memotest/3' },
];

// Guardar los datos en la base de datos
async function saveCards() {
  for (const card of cards) {
    await prisma.card.create({
      data: {
        img: card.img
      }
    });
  }
  console.log("Datos guardados en la base de datos");
}

// Ruta para obtener los datos
app.get('/', async (req, res) => {
  const allCards = await prisma.card.findMany();
  res.json(allCards);
});

app.listen(port, () => {
  console.log(`Server running on port 3000`);
  saveCards();
});
*/
// index.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require('express'); // Suponiendo que uses Express para tu servidor
const app = express();
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

// Ruta para agregar palabras a PuzzleWord
app.post('/api/puzzle-words', async (req, res) => {
  const { word } = req.body;
  try {
    const newPuzzleWord = await prisma.puzzleWord.create({
      data: { word },
    });
    res.status(201).json(newPuzzleWord);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la palabra del Puzzle' });
  }
});

// Ruta para obtener todas las palabras de PuzzleWord
app.get('/api/puzzle-words', async (req, res) => {
  try {
    const allPuzzleWords = await prisma.puzzleWord.findMany();
    res.json(allPuzzleWords);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las palabras del Puzzle' });
  }
});

// Escuchar en el puerto
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});

// Manejo de errores y desconexión de Prisma
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit();
});

