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
app.use("/api", apiRoutes)
/*
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

import { v2 as cloudinary } from 'cloudinary';
import path from 'path';

(async function() {
    // Configuration
    cloudinary.config({ 
        cloud_name: 'dp2xcfg7x', 
        api_key: '924623214335671', 
        api_secret: 'mkJM05C75m3Z83mdtzzcCI9aTqM' // Reemplaza con tu API secret
    });

    const imagePaths = [
        'C:\\Users\\47653943\\Documents\\GitHub\\db_esi\\memotest\\1.jpg',
        'C:\\Users\\47653943\\Documents\\GitHub\\db_esi\\memotest\\2.png',
        'C:\\Users\\47653943\\Documents\\GitHub\\db_esi\\memotest\\3.jpg'
    ];

    try {
        for (const imagePath of imagePaths) {
            const uploadResult = await cloudinary.uploader.upload(imagePath, {
                public_id: path.basename(imagePath, path.extname(imagePath)),
            });
            console.log(`Uploaded ${imagePath}:`, uploadResult);
        }
    } catch (error) {
        console.error('Error uploading images:', error);
    }

    // Example of how you might optimize and transform an uploaded image
    const publicId = '1'; // Replace with the public_id of the image you want to optimize/transform
    const optimizeUrl = cloudinary.url(publicId, {
        fetch_format: 'auto',
        quality: 'auto'
    });

    console.log('Optimized URL:', optimizeUrl);

    const autoCropUrl = cloudinary.url(publicId, {
        crop: 'auto',
        gravity: 'auto',
        width: 500,
        height: 500,
    });

    console.log('Auto-cropped URL:', autoCropUrl);
})();
