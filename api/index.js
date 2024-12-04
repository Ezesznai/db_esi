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


// Habilitar CORS solo para la ruta /card
app.get('/card', cors(), async (req, res) => {
  try {
    // Obtener todos los registros de la tabla 'card'
    const cards = await prisma.card.findMany({
      select: {
        id: true, // Selecciona el ID
        img: true, // Selecciona el campo con los enlaces de imágenes
      },
    });

    // Enviar los datos al cliente
    res.status(200).json(cards);
  } catch (error) {
    console.error('Error al obtener los datos de las cards:', error);
    res.status(500).json({ error: 'Error al obtener los datos de las cards' });
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

})

app.get('/infoprimero', async (req, res) => {
  try {
    const data = await prisma.info.findUnique({
      where: { id: 1 },
      select: { infografia: true }, // Selecciona solo la columna infografia
    });

    if (!data) {
      return res.status(404).json({ error: 'No se encontró la información con el ID 1' });
    }

    res.json(data);
  } catch (error) {
    console.error('Error al obtener la infografía:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.get('/infosegundo', async (req, res) => {
  try {
    const data = await prisma.info.findUnique({
      where: { id: 2 },
      select: { infografia: true }, // Selecciona solo la columna infografia
    });

    if (!data) {
      return res.status(404).json({ error: 'No se encontró la información con el ID 2' });
    }

    res.json(data);
  } catch (error) {
    console.error('Error al obtener la infografía:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});


app.get('/infosegundo', async (req, res) => {
  try {
    const data = await prisma.info.findUnique({
      where: { id: 2 },
      select: { infografia: true },
    });

    if (!data) {
      return res.status(404).json({ error: 'No se encontró la información con el ID 2' });
    }

    res.json(data);
  } catch (error) {
    console.error('Error al obtener la infografía:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});


app.get('/infotercero', async (req, res) => {
  try {
    const data = await prisma.info.findUnique({
      where: { id: 3 },
      select: { infografia: true },
    });

    if (!data) {
      return res.status(404).json({ error: 'No se encontró la información con el ID 3' });
    }

    res.json(data);
  } catch (error) {
    console.error('Error al obtener la infografía:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.get("/usuarios", async (req, res) => {
  try {
    const usuarios = await prisma.usuarios.findMany({
      select: {
        id: true,
        nombre: true,
        score_mt: true,
        tiempo_sp: true,
      },
    });
    res.json(usuarios);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ error: "Error interno al obtener usuarios" });
  }
});

// Ruta para actualizar el primer usuario con valores nulos en score_mt y tiempo_sp
app.post("/completar-usuario", async (req, res) => {
  const { score_mt, tiempo_sp } = req.body;

  if (score_mt == null || tiempo_sp == null) {
    return res.status(400).json({ error: "Se requieren los valores de score_mt y tiempo_sp" });
  }

  try {
    // Buscar el primer usuario con valores nulos en score_mt y tiempo_sp
    const usuario = await prisma.usuarios.findFirst({
      where: {
        AND: [
          { score_mt: null },
          { tiempo_sp: null },
        ],
      },
    });

    if (!usuario) {
      return res.status(404).json({ error: "No hay usuarios con valores incompletos" });
    }

    // Actualizar los valores de score_mt y tiempo_sp para ese usuario
    const usuarioActualizado = await prisma.usuarios.update({
      where: { id: usuario.id },
      data: {
        score_mt,
        tiempo_sp,
      },
    });

    res.status(200).json({
      message: "Usuario actualizado correctamente",
      usuario: usuarioActualizado,
    });
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});


export default app




