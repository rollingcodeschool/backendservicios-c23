// Middleware especial de manejo de errores en Express (recibe 4 parámetros)
const errorMulter = (err, _req, res, next) => {
  // Si Multer lanza un error y el código corresponde al exceso de tamaño
  if (err && err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({ mensaje: 'La imagen no puede superar los 2MB' });
  }
  
  // Si no es un error de Multer, pasa el control al siguiente manejador de errores
  next(err);
};

export default errorMulter;