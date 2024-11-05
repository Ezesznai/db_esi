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
})

app.get("/infoPrimero", (req, res) => {
  const contenido = `
1. Respeto
Las escuelas tienen la responsabilidad de promover el respeto como un valor central en la educación sexual. Esto implica no solo el respeto por uno mismo, sino también por los demás, entendiendo y aceptando la diversidad en cuanto a género, orientación sexual, identidades, y formas de vivir la sexualidad. Los espacios escolares deben fomentar un ambiente en el que los estudiantes puedan expresar sus opiniones, emociones y sentimientos sin temor a ser juzgados o violentados. Este respeto también se extiende a reconocer los derechos de los estudiantes a recibir información adecuada y precisa en el momento oportuno de su desarrollo.

2. Relaciones
Otro aspecto crucial de la educación sexual integral es el fomento de relaciones saludables, tanto dentro del ámbito familiar como en otros espacios de interacción. La escuela debe ser un lugar donde los estudiantes puedan reflexionar sobre los diferentes tipos de relaciones, ya sean de amistad, de pareja o familiares, y cómo establecer vínculos basados en el respeto, la comunicación y la comprensión mutua. En este sentido, la educación sexual integral promueve el diálogo intergeneracional, incentivando a los estudiantes a hablar de estos temas con sus familias y a formar lazos más sólidos basados en la empatía y el respeto.

3. Desarrollo 
La construcción de la identidad y el autoconocimiento son aspectos clave del desarrollo personal. Las escuelas deben acompañar a los estudiantes en este proceso, proporcionándoles herramientas para entender y manejar sus emociones, lo que les permitirá tomar decisiones responsables en el futuro. La educación sexual integral tiene la responsabilidad de elevar la autoestima de los estudiantes, ayudándoles a sentirse seguros de sí mismos y gratificados por sus logros escolares y personales. El respeto por la diversidad y la promoción de relaciones saludables también son esenciales para fomentar un crecimiento emocional equilibrado.

4. Cuerpo
Brindar información científica y clara sobre el cuerpo y la salud es una de las principales responsabilidades de las escuelas. Los estudiantes necesitan conocer su cuerpo, los cambios que experimentan durante el crecimiento y cómo cuidar de su salud de manera responsable. Esto incluye información sobre higiene, prevención de enfermedades, métodos anticonceptivos, y cómo acceder a los recursos de salud disponibles en la comunidad. Al proporcionar esta información, las escuelas no solo promueven el autocuidado, sino que también contribuyen a que los estudiantes ejerzan su derecho a la salud y comprendan la importancia de protegerse a sí mismos y a los demás.

5. Sexualidad
La educación sexual integral no se limita únicamente a la información biológica, sino que abarca una comprensión amplia y reflexiva de la sexualidad en relación con el cuerpo, las emociones, los deseos, y las relaciones interpersonales. Las escuelas tienen la tarea de desmitificar tabúes en torno a la sexualidad y crear un ambiente en el que los estudiantes puedan discutir estos temas con libertad y sin temor. Promover el pensamiento crítico sobre las creencias y prácticas relacionadas con la sexualidad es fundamental para que los estudiantes desarrollen una visión sana y equilibrada. Además, se les debe brindar herramientas para que puedan tomar decisiones responsables que no pongan en riesgo su bienestar.


  `;
  res.status(200).send(contenido);
});
app.get("/infoSegundo", (req, res) => {
  const contenidoSegundo = `
1. Respeto
En la escuela nos enseñan que es muy importante respetar a todos, aunque tengamos ideas o formas de ser diferentes. Aprendemos que hay que ser amables y tratar bien a los demás, sin lastimar con palabras o acciones. También, es importante recibir la información adecuada a nuestra edad para que podamos entender mejor todo lo que pasa en nuestro cuerpo y nuestras emociones.

2. Familia y Relaciones
Nos ayudan a comprender cómo llevarnos bien con la familia, los amigos y todas las personas a nuestro alrededor. Aprendemos a escuchar a los demás, a hablar cuando algo nos molesta y a solucionar problemas de forma pacífica. La escuela nos enseña a crear buenas amistades y a tener relaciones sanas, donde todos se sientan cuidados y respetados.

3. Desarrollo Personal y Emocional
A medida que crecemos, también cambiamos por dentro. La escuela nos acompaña en este crecimiento, ayudándonos a entender lo que sentimos en cada momento. Nos enseñan a conocer nuestras emociones, como la alegría, la tristeza o el enojo, para que podamos manejarlas bien. También aprendemos a valorarnos, a tener confianza en lo que hacemos y a sentirnos orgullosos de nuestros logros.

4. Cuerpo y Salud
En la escuela aprendemos sobre cómo funciona nuestro cuerpo y cómo cuidarlo para estar sanos. Nos enseñan a comer bien, a lavarnos las manos y a mantener una buena higiene para no enfermarnos. Además, aprendemos sobre los cambios que viviremos a medida que crecemos, y a quiénes podemos acudir si tenemos alguna duda o problema con nuestra salud.

5. Sexualidad
La escuela nos enseña que la sexualidad es parte de nosotros y que va más allá del cuerpo; también tiene que ver con nuestras emociones y relaciones con los demás. Es importante aprender sobre los cambios que experimentaremos al crecer, para entendernos mejor y poder cuidarnos. Nos ayudan a hablar de estos temas sin vergüenza, para que podamos tomar decisiones seguras y responsables sobre nuestro cuerpo y nuestras relaciones.


  `;
  res.send(contenidoSegundo);
});

app.get("/infoTercero", (req, res) => {
  const contenidoTercero = `
1. Respeto
En la escuela aprendemos que es importante respetar a todos, sin importar cómo son o qué les gusta. Nadie debe ser tratado de forma diferente o mal por ser quien es o por tener gustos distintos. No se trata de juzgar a alguien por su apariencia, forma de vestir o por lo que piensa. Todos somos únicos, y esas diferencias no deben ser motivo para burlas o malos comentarios. En la escuela no se deben reforzar estereotipos ni decir que hay una única forma correcta de ser. El respeto es clave para que todos se sientan bien y valorados.

2. Familia y Relaciones
La escuela también nos enseña a entender y respetar las diferentes formas de ser y de vivir en familia. No todas las familias son iguales, y eso está bien. Lo importante es que las relaciones se basen en el cariño, el respeto y el apoyo mutuo. No debemos pensar que hay una única manera correcta de vivir o de formar una familia. Aprendemos que no podemos imponer nuestras ideas a los demás ni hacer que alguien se sienta mal por sus elecciones o por su forma de vivir. La escuela nos ayuda a entender que debemos ser abiertos y respetar las decisiones personales de cada persona.

3. Desarrollo Personal y Emocional
A medida que crecemos, empezamos a conocernos mejor y a descubrir qué cosas nos gustan, cómo queremos ser, y qué es lo que nos hace sentir bien. La escuela tiene la responsabilidad de acompañarnos en ese proceso, ayudándonos a sentirnos seguros de quiénes somos, pero sin imponer ideas o pensamientos que no nos corresponden. Cada uno tiene derecho a decidir sobre su identidad y sobre qué es lo mejor para su vida. Nadie, ni en la escuela ni en ningún otro lugar, debe decirnos que hay una sola forma de ser o de sentir. El desarrollo personal es algo que cada uno vive a su manera, y la escuela debe enseñarnos a ser libres para tomar nuestras propias decisiones sin sentirnos mal por ellas.

4. Cuerpo y Salud
En la escuela aprendemos mucho sobre cómo cuidar nuestro cuerpo y mantenernos sanos, pero también es importante que entendamos que nuestra privacidad es algo que siempre debe ser respetado. Nadie puede invadir nuestra intimidad o hacer preguntas incómodas con el pretexto de educarnos. La información que recibimos debe ayudarnos a tomar decisiones responsables sobre nuestra salud, pero la escuela no debe obligarnos a seguir una sola manera de pensar o de actuar. Cuidar nuestro cuerpo es una decisión personal, y tenemos derecho a hacer lo que consideramos mejor para nosotros, siempre respetando a los demás y recibiendo la información correcta.

5. Sexualidad
La sexualidad es un aspecto muy personal de nuestra vida, y la escuela tiene que darnos información que nos ayude a entenderla y cuidarnos, pero nunca imponer ideas o decirnos cómo debemos vivirla. Cada persona tiene el derecho de decidir sobre su identidad sexual y su forma de vivir, y no debemos juzgar a nadie por ello. En la escuela aprendemos que no está bien discriminar o tratar mal a alguien por sus elecciones personales, ya que cada uno tiene derecho a ser feliz y sentirse cómodo con quien es. La sexualidad es algo que debe ser respetado por todos, y la escuela no debe imponer una forma de pensar o actuar sobre este tema. Nos enseñan a ser responsables, a tomar decisiones cuidadosas sobre nuestro cuerpo y nuestras relaciones, y a respetar a los demás, sin importar sus decisiones o identidad sexual.

  `;
  res.send(contenidoTercero);
});

export default app;

// Ruta para gestionar PuzzleWords
export default app
// async (req, res) => {
//   if (req.method === 'GET') {
//     try {
//       // Recuperar todas las palabras de la tabla PuzzleWord
//       const words = await prisma.puzzleWord.findMany({
//         select: {
//           id: true,
//           word: true, // Aquí se espera que 'word' sea un JSON
//         },
//       });

//       // Enviar la respuesta con las palabras
//       res.status(200).json(words);
//     } catch (error) {
//       // Manejo de errores
//       console.error('Error al recuperar las palabras:', error);
//       res.status(500).json({ error: 'Error al recuperar las palabras' });
//     }
//   } else {
//     // Manejo de métodos no permitidos
//     res.setHeader('Allow', ['GET']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// };

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