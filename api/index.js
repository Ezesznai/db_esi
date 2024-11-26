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

// Ruta para obtener la infografía del ID 2
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

// Ruta para obtener la infografía del ID 3
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


// Ruta para iniciar sesión
app.post('/login', async (req, res) => {
  const { nombre, contraseña, score_mt, tiempo_sp } = req.body;

  // Verificar si el usuario existe con el nombre
  const usuario = await prisma.usuario.findUnique({
    where: { nombre: nombre },
  });

  if (!usuario) {
    return res.status(401).json({ message: 'Usuario no encontrado' });
  }

  // Verificar si la contraseña coincide (si la usas cifrada con bcrypt)
  const contraseñaValida = await bcrypt.compare(contraseña, usuario.contraseña);

  if (!contraseñaValida) {
    return res.status(401).json({ message: 'Contraseña incorrecta' });
  }

  // Validar score_mt y tiempo_sp
  if (usuario.score_mt !== score_mt || usuario.tiempo_sp !== tiempo_sp) {
    return res.status(401).json({ message: 'Datos no válidos' });
  }

  // Si todo es correcto, devolver una respuesta exitosa
  return res.status(200).json({ message: 'Inicio de sesión exitoso', usuario });
});

// Ruta para obtener los datos del usuario sin el id
app.get('/usuario/:nombre', async (req, res) => {
  const { nombre } = req.params;

  const usuario = await prisma.usuario.findUnique({
    where: { nombre: nombre },
  });

  if (!usuario) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }

  // Excluir el campo 'id' antes de enviar la respuesta
  const { id, ...usuarioSinId } = usuario;

  return res.status(200).json(usuarioSinId);
});


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



