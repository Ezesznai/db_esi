/*
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import express from 'express';
import apiRoutes from "./api/index.js"
import cors from 'cors';

app.use(cors());
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;
app.use("/api", apiRoutes)

app.get('/favicon.ico', (req, res) => res.status(204));

  
  // Ruta para obtener los datos //necesito hacer un commit
  app.get('/', async (req, res) => {
    const allCards = await prisma.card.findMany();
    res.json(allCards);
  });
  
app.listen(port, () => {
  console.log(`Server running on port 3000`);
  // saveCards();
});
// Manejo de errores y desconexión de Prisma
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit();
});
  */

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import express from 'express';
import apiRoutes from "./api/index.js"
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;
app.use("/api", apiRoutes)

app.get('/favicon.ico', (req, res) => res.status(204));

  
  // Ruta para obtener los datos //necesito hacer un commit
  app.get('/', async (req, res) => {
    const allCards = await prisma.card.findMany();
    res.json(allCards);
  });
  
app.listen(port, () => {
  console.log(`Server running on port 3000`);
  // saveCards();
});
// Manejo de errores y desconexión de Prisma
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit();
});
