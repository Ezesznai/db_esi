const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require('express'); // Suponiendo que uses Express para tu servidor
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

// Ruta para agregar palabras a PuzzleWord
app.post('/puzzle-words', async (req, res) => {
  const { word } = req.body;
  try {
    const newPuzzleWord = await prisma.puzzleWord.create({
      data: { word },
    });
    res.status(201).json(newPuzzleWord);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la palabra del Puzzle' });
  }
});

// Ruta para obtener todas las palabras de PuzzleWord
app.get('/puzzle-words', async (req, res) => {
  try {
    const allPuzzleWords = await prisma.puzzleWord.findMany();
    res.json(allPuzzleWords);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las palabras del Puzzle' });
  }

});



// Escuchar en el puerto
module.exports = app;

/*
import { v2 as cloudinary } from 'cloudinary';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Configura Cloudinary con las variables de entorno
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

const imagePaths = [
    'C:\\Users\\47653943\\Documents\\GitHub\\db_esi\\memotest\\1.jpg',
    'C:\\Users\\47653943\\Documents\\GitHub\\db_esi\\memotest\\2.png',
    'C:\\Users\\47653943\\Documents\\GitHub\\db_esi\\memotest\\3.jpg'
];

async function uploadImages() {
    try {
        for (const imagePath of imagePaths) {
            const publicId = uuidv4();
            const uploadResult = await cloudinary.uploader.upload(imagePath, {
                public_id: publicId,
            });
            console.log(`Uploaded ${imagePath} with public_id ${publicId}:`, uploadResult);
        }
    } catch (error) {
        console.error('Error uploading images:', error);
    }
}

uploadImages();

// Example function to get optimized and transformed URLs
function getImageUrls(publicId) {
    const optimizeUrl = cloudinary.url(publicId, {
        fetch_format: 'auto',
        quality: 'auto'
    });

    const autoCropUrl = cloudinary.url(publicId, {
        crop: 'auto',
        gravity: 'auto',
        width: 500,
        height: 500,
    });

    return { optimizeUrl, autoCropUrl };
}

// Export a function to be used in your frontend
export function getPublicImageUrls(publicId) {
    return getImageUrls(publicId);
}
*/