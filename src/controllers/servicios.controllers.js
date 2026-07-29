import Servicio from "../models/servicio.js";

export const crearServicio = async (req, res) => {
  try {
    //console.log(req.body)
    const servicioNuevo = new Servicio(req.body);
    //aqui quiero guardar en la BD
    await servicioNuevo.save();
    res.status(201).json({ mensaje: "El servicio fue creado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Ocurrio un error al crear el servicio" });
  }
};

export const listarServicios = async (req, res) => {
  try {
    const {termino} = req.query
    const query ={}

    if(termino){
      query.nombreServicio = { $regex: termino, $options: "i"}
    }

    const servicios = await Servicio.find(query).populate('categoria','nombre descripcion')
    res.status(200).json(servicios);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Ocurrio un error al listar los servicios" });
  }
};
export const obtenerServicioPorID = async (req, res) => {
  try {
    console.log(req.params.id);
    //deberia validar que el id exista y sea un id de mongodb
    const servicioBuscado = await Servicio.findById(req.params.id).populate('categoria','nombre descripcion')
    console.log(servicioBuscado);
    if (!servicioBuscado) {
      return res
        .status(404)
        .json({ mensaje: "No se encontro un servicio con el id enviado" });
    }
    res.status(200).json(servicioBuscado);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Ocurrio un error al buscar un servicio por id" });
  }
};

export const borrarServicioPorID = async (req, res) => {
  try {
    //deberia validar que el id exista y sea un id de mongodb
    const servicioBorrado = await Servicio.findByIdAndDelete(req.params.id)
    if (!servicioBorrado) {
      return res
        .status(404)
        .json({ mensaje: "No se encontro un servicio con el id enviado" });
    }
    res.status(200).json({mensaje: 'El servicio fue eliminado correctamente'});
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Ocurrio un error al intentar borrar un servicio por id" });
  }
};
export const editarServicioPorID = async (req, res) => {
  try {
    //deberia validar que el id exista y sea un id de mongodb
    const servicioActualizado = await Servicio.findByIdAndUpdate(req.params.id, req.body, {new:true})
    if (!servicioActualizado) {
      return res
        .status(404)
        .json({ mensaje: "No se encontro un servicio con el id enviado" });
    }
    res.status(200).json({mensaje: 'El servicio fue editado correctamente', servicio: servicioActualizado});
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Ocurrio un error al intentar editar un servicio por id" });
  }
};
