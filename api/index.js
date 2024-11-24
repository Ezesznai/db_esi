import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import express from 'express';
const app = express.Router();
app.use(express.json());
import cors from 'cors';
app.use(cors());

// Ruta para agregar una nueva pregunta
app.post("/preguntas", async (req, res) => {
  const preg = req.body.pregunta;
  if (preg !== "") {
    const addPreg = await prisma.preguntas.create({
      data: { pregunta: preg }
    });
    return res.json(addPreg);
  }
  res.status(401).json({ "error": "recibido una cadena vacía" });
});

// Ruta para obtener todas las preguntas
app.get("/preguntas", async (req, res) => {
  const preg = await prisma.preguntas.findMany({
    select: {
      id: true,
      pregunta: true
    }
  });
  res.json(preg);
});

// Ruta para agregar un Card
app.post('/', async (req, res) => {
  const { img } = req.body;
  const newCard = await prisma.card.create({
    data: { img },
  });
  res.status(201).json(newCard);
});

// Ruta para obtener todas las palabras de PuzzleWord
app.get("/", async (req, res) => {
  const words = await prisma.puzzleWord.findMany({
    select: {
      id: true,
      word: true,
    },
  });
  res.status(200).json(words);
});

// Ruta para obtener información de "infoPrimero"
app.get('/api/infoPrimero', async (req, res) => {
  const info = await prisma.info.findUnique({
    where: { id: 1 },
  });
  res.json(info);
});

// Ruta para obtener información de "infoSegundo"
app.get('/api/infoSegundo', async (req, res) => {
  const info = await prisma.info.findUnique({
    where: { id: 2 },
  });
  res.json(info);
});

// Ruta para obtener información de "infoTercero"
app.get('/api/infoTercero', async (req, res) => {
  const info = await prisma.info.findUnique({
    where: { id: 3 },
  });
  res.json(info);
});

export default app;

/*
//Desde aca hasta export default app estaba en el archivo orginal
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

