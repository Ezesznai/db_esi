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
const apiRoutes = require("./api/index.js")
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;
/*
app.use("/api", apiRoutes)
app.get("/", (req, res)=> {
    res.json({message: "HOLISS"})
})

// Escuchar en el puerto
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
*/
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
// Manejo de errores y desconexión de Prisma
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit();
});

