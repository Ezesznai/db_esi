import { v2 as cloudinary } from 'cloudinary';
import path from 'path';

const cloudinary = require('cloudinary');
// Configura Cloudinary con las variables de entorno
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});