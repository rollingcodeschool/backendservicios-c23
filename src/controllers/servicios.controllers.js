import Servicio from "../models/servicio.js";

export const prueba = (req, res) => {
  res.json("hasta luego ultima prueba");
}

export const crearServicio = async(req, res) => {
  try{
    //console.log(req.body)
    const servicioNuevo = new Servicio(req.body)
    //aqui quiero guardar en la BD
    await servicioNuevo.save()
    res.status(201).json({mensaje: 'El servicio fue creado correctamente'})

  }catch(error){
    console.error(error)
    res.status(500).json({mensaje: 'Ocurrio un error al crear el servicio'})
  }
  
}

export const listarServicios = async(req, res) => {
  try{
    const servicios = await Servicio.find();
    res.status(200).json(servicios);
  }catch(error){
    console.error(error)
    res.status(500).json({mensaje: 'Ocurrio un error al listar los servicios'})
  }
  
}

