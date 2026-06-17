export const prueba = (req, res) => {
  res.json("hasta luego ultima prueba");
}

export const crearServicio = (req, res) => {
  try{
    //console.log(req.body)
    res.json("hasta luego");

  }catch(error){
    console.error(error)
    res.status(500).json({mensaje: 'Ocurrio un error al crear el servicio'})
  }
  
}