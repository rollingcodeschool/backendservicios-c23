import { v2 as cloudinary } from 'cloudinary';

// Inicializamos la configuración global del SDK de Cloudinary
// con las credenciales privadas de tu archivo .env
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Identificador de tu cuenta/espacio en Cloudinary
  api_key: process.env.CLOUDINARY_API_KEY,       // Clave pública para autenticar peticiones
  api_secret: process.env.CLOUDINARY_API_SECRET, // Clave privada para firmar las subidas (¡nunca exponer al frontend!)
});

// Exportamos la instancia ya configurada para usar su API en los controladores
export default cloudinary;