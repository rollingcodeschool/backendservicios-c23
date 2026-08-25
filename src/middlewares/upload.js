import multer from "multer";

// Usamos memoryStorage para almacenar el archivo temporalmente en la memoria RAM (Buffer)
// de Node.js en lugar de escribirlo físicamente en el disco duro del servidor.
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { 
    fileSize: 2 * 1024 * 1024 // Define el límite máximo permitido: 2MB (en bytes)
  }
});

// Exportamos el middleware listo para usar en las rutas (ej: upload.single('imagen'))
export default upload;