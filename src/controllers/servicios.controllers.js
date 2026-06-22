import Servicio from "../models/servicio.js";

export const prueba = (req, res) => {
  res.json("hasta luego ultima prueba");
};

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
    const servicios = await Servicio.find();
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
    const servicioBuscado = await Servicio.findById(req.params.id);
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
