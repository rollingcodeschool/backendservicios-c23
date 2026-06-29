export const crearusuario = async(req, res)=>{
    try {
        res.status(201).json({mensaje: 'aqui creo un usuario'})
    } catch (error) {
        console.error(error)
        res.status(500).post({mensaje: 'Ocurrio un error, no se pudo crear el usuario'})
    }
}