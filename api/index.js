//Desde aca hasta export default app estaba en el archivo orginal
/*
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import express from 'express';
const app = express.Router();
app.use(express.json());
import cors from 'cors';
app.use(cors());

app.post("/preguntas", async (req,res)=> {
  const preg = req.body.pregunta
  if(preg !== "") {
    const addPreg = await prisma.preguntas.create({
      data: {pregunta: preg}
    })
    return res.json(addPreg)
  }
  res.status(401).json({"error": "recieved empty string"})
})
app.get("/preguntas", async (req,res)=> {
  const preg = await prisma.preguntas.findMany({
    select: {
      id: true,
      pregunta: true
    }
  })
  res.json(preg)
})

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

app.get("/", async (req, res) => {
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
  app.get('/api/infoPrimero', async (req, res) => {
    try {
      const info = await prisma.info.findUnique({
        where: { id: 1 },
      });
      if (info) {
        res.json(info);
      } else {
        res.status(404).json({ error: 'Infografía no encontrada' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener la infografía' });
    }
  });
  
  // Ruta para /infoSegundo
  app.get('/api/infoSegundo', async (req, res) => {
    try {
      const info = await prisma.info.findUnique({
        where: { id: 2 },
      });
      if (info) {
        res.json(info);
      } else {
        res.status(404).json({ error: 'Información no encontrada' });
      }
    } catch (error) {
      console.error('Error al obtener la información:', error);
      res.status(500).json({ error: 'Error al obtener la información' });
    }
  });
  
  // Ruta para /infoTercero
  app.get('/api/infoTercero', async (req, res) => {
    try {
      const info = await prisma.info.findUnique({
        where: { id: 3 },
      });
      if (info) {
        res.json(info);
      } else {
        res.status(404).json({ error: 'Información no encontrada' });
      }
    } catch (error) {
      console.error('Error al obtener la información:', error);
      res.status(500).json({ error: 'Error al obtener la información' });
    }
  });
  
  // Iniciar el servidor en un puerto especificado (puedes usar 3000 o el que prefieras)
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
  });
})
export default app
*/
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import express from 'express';
import cors from 'cors';
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Rutas API (adaptadas de api/index.js)
app.use("/api", express.Router()
  .post("/preguntas", async (req, res) => {
    const preg = req.body.pregunta;
    if (preg !== "") {
      try {
        const addPreg = await prisma.preguntas.create({ data: { pregunta: preg } });
        return res.json(addPreg);
      } catch (error) {
        console.error("Error al crear pregunta:", error);
        return res.status(500).json({ error: "Error al guardar la pregunta" });
      }
    }
    res.status(401).json({ error: "Se recibió un string vacío" });
  })
  .get("/preguntas", async (req, res) => {
    try {
      const preg = await prisma.preguntas.findMany({
        select: { id: true, pregunta: true }
      });
      res.json(preg);
    } catch (error) {
      console.error("Error al obtener preguntas:", error);
      res.status(500).json({ error: "Error al obtener las preguntas" });
    }
  })
  .post("/", async (req, res) => {
    const { img } = req.body;
    try {
      const newCard = await prisma.card.create({ data: { img } });
      res.status(201).json(newCard);
    } catch (error) {
      res.status(500).json({ error: "Error al crear el Card" });
    }
  })
  .get("/", async (req, res) => {
    try {
      const words = await prisma.puzzleWord.findMany({
        select: { id: true, word: true },
      });
      res.status(200).json(words);
    } catch (error) {
      console.error("Error al recuperar las palabras:", error);
      res.status(500).json({ error: "Error al recuperar las palabras" });
    }
  })
  .get("/infoPrimero", async (req, res) => {
    try {
      const info = await prisma.info.findUnique({ where: { id: 1 } });
      info ? res.json(info) : res.status(404).json({ error: "Infografía no encontrada" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener la infografía" });
    }
  })
  .get("/infoSegundo", async (req, res) => {
    try {
      const info = await prisma.info.findUnique({ where: { id: 2 } });
      info ? res.json(info) : res.status(404).json({ error: "Información no encontrada" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener la información" });
    }
  })
  .get("/infoTercero", async (req, res) => {
    try {
      const info = await prisma.info.findUnique({ where: { id: 3 } });
      info ? res.json(info) : res.status(404).json({ error: "Información no encontrada" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener la información" });
    }
  })
);

// Ruta raíz (integrada)
app.get('/', async (req, res) => {
  try {
    const allCards = await prisma.card.findMany();
    res.json(allCards);
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    res.status(500).json({ error: "Error al obtener los datos" });
  }
});

// Favicon handler
app.get('/favicon.ico', (req, res) => res.status(204));

// Server listener
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor ejecutándose en el puerto ${port}`);
});

// Prisma cleanup
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit();
});

