import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import express from 'express';
const app = express.Router();
app.use(express.json());
import cors from 'cors';

app.use(cors(), express.json());
app.use(express.json())

app.post("/preguntas", async (req,res)=> {
  console.log("body ", req.body)
  const preg = req.body.pregunta
  console.log("server recived: " + preg)
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

/*
// Ruta para gestionar Card (Este código es específico para una tabla diferente, pero lo mantendré como está)
app.post('/card', cors(), async (req, res) => {
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

*/

app.use(express.json());  // Para analizar los cuerpos JSON en las solicitudes

// Habilitar CORS solo para la ruta /card
app.post('/card', cors(), async (req, res) => {
  const { imgLinks } = req.body; // Espera un array de enlaces de imágenes (por ejemplo, de Cloudinary)
  
  // Validar que se recibieron enlaces
  if (!imgLinks || !Array.isArray(imgLinks)) {
    return res.status(400).json({ error: 'Se esperaba un array de enlaces de imágenes' });
  }

  try {
    // Guardar el JSON de enlaces en la base de datos
    const newCard = await prisma.card.create({
      data: { imgLinks: JSON.stringify(imgLinks) }, // Guardar el JSON como un string
    });

    // Devolver la respuesta con los datos guardados
    res.status(201).json({
      message: 'Card creado exitosamente',
      card: newCard,
    });
  } catch (error) {
    console.error('Error al crear el Card:', error);
    res.status(500).json({ error: 'Error al crear el Card' });
  }
});

// Ruta para obtener las cards con los enlaces de las imágenes
app.get('/card', async (req, res) => {
  try {
    // Recuperar todas las cards desde la base de datos
    const cards = await prisma.card.findMany({
      select: {
        id: true,
        imgLinks: true, // Devolver el campo con los enlaces de imágenes
      },
    });

    // Parsear los enlaces de las imágenes (deben ser JSON válidos)
    const cardsWithLinks = cards.map(card => ({
      ...card,
      imgLinks: JSON.parse(card.imgLinks), // Convertir el string JSON a un array
    }));

    res.status(200).json(cardsWithLinks);
  } catch (error) {
    console.error('Error al obtener las cards:', error);
    res.status(500).json({ error: 'Error al obtener las cards' });
  }
});



app.get("/puzzlewords", async (req, res) => {
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
  // const PORT = process.env.PORT || 3000;
  // app.listen(PORT, () => {
  //   console.log(`Servidor escuchando en http://localhost:${PORT}`);
  // });
})


// Ruta para gestionar PuzzleWords
export default app
 async (req, res) => {
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
*/