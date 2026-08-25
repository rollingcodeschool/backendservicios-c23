import cloudinary from "./cloudinary.js"

const subirImagenACloudinary = (buffer)=>{
   
    return new Promise((resolve, reject)=>{
     // 1. Iniciamos el Stream de carga especificando la carpeta de destino en Cloudinary
    // El segundo parámetro es una función callback que se ejecutará al terminar el proceso
        const stream = cloudinary.uploader.upload_stream({ folder: 'servicios-c23'}, (error, result)=>{
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