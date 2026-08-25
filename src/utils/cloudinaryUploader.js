import cloudinary from "./cloudinary.js"

/**
 * Función que recibe un Buffer (imagen en memoria) y la transmite hacia Cloudinary.
 * @param {Buffer} buffer - Archivo en formato de datos binarios provisto por Multer (req.file.buffer).
 * @returns {Promise<Object>} Promesa que resuelve con la respuesta de Cloudinary (URL pública, public_id, etc.).
 */

const subirImagenACloudinary = (buffer)=>{
    // Retornamos una Promesa manual para poder usar 'await' al llamar a esta función en los controladores
    return new Promise((resolve, reject)=>{
        // 1. Iniciamos el Stream de carga especificando la carpeta de destino en Cloudinary
    // El segundo parámetro es una función callback que se ejecutará al terminar el proceso
        const stream = cloudinary.uploader.upload_stream({ folder: 'nuevo-servicio'}, (error, result)=>{
            if(result){
                // Si Cloudinary procesa con éxito la imagen, resolvemos la promesa devolviendo el objeto resultado
                resolve(result)
            }else{
                // Si ocurre un error (red, credenciales, formato), rechazamos la promesa enviando el error
                reject(error)
            }
        })
        // 2. Enviamos los datos del buffer al stream y cerramos la transmisión para que Cloudinary comience la subida
        stream.end(buffer)
    })
}

export default subirImagenACloudinary