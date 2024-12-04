//a partir de lo de aca abajo iba sin comentar
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import express from 'express';
import apiRoutes from "./api/index.js"
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;
app.use("/api", apiRoutes)

app.get('/favicon.ico', (req, res) => res.status(204));

  

  app.get('/', async (req, res) => {
    const allCards = await prisma.card.findMany();
    res.json(allCards);
  });

app.listen(port, () => {
  console.log(`Server running on port 3000`);
});

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit();
});


