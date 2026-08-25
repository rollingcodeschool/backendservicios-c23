import Servicio from "../models/servicio.js";
import subirImagenACloudinary from "../utils/cloudinaryUploader.js";

// export const crearServicio = async (req, res) => {
//   try {
//     //console.log(req.body)
//     const servicioNuevo = new Servicio(req.body);
//     //aqui quiero guardar en la BD
//     await servicioNuevo.save();
//     res.status(201).json({ mensaje: "El servicio fue creado correctamente" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ mensaje: "Ocurrio un error al crear el servicio" });
//   }
// };

export const crearServicio = async (req, res) => {
  try {
    let imagenUrl = "";
    // 1. Si enviaron una imagen por Multer, la subimos a Cloudinary
    if (req.file) {
      const resultado = await subirImagenACloudinary(req.file.buffer);
      console.log(resultado);
      imagenUrl = resultado.secure_url;
    } else {
      // Imagen por defecto si es opcional en la creación
      imagenUrl =
        "https://images.pexels.com/photos/5652023/pexels-photo-5652023.jpeg";
    }
    // 2. Asignamos la URL obtenida al objeto req.body
    const nuevoServicioData = {
      ...req.body,
      imagen: imagenUrl,
    };
    // 3. Guardamos en MongoDB
    const servicioNuevo = new Servicio(nuevoServicioData);
    await servicioNuevo.save();
    res.status(201).json({ mensaje: "El servicio fue creado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Ocurrio un error al crear el servicio" });
  }
};

export const listarServicios = async (req, res) => {
  try {
    const { termino, pagina, cantServicios } = req.query;
    const paginaNumero = parseInt(pagina) || 1;
    const limite = parseInt(cantServicios) || 10;
    const salto = (paginaNumero - 1) * limite;

    const query = {};

    if (termino) {
      query.nombreServicio = { $regex: termino, $options: "i" };
    }
    // tratemos de no usar varias consultas sueltas
    // const servicios = await Servicio.find(query).populate('categoria','nombre descripcion')
    // const cantidadTotal = await Servicio.countDocuments(query)

    const [servicios, cantidadTotal] = await Promise.all([
      Servicio.find(query)
        .populate("categoria", "nombre descripcion")
        .skip(salto)
        .limit(limite),
      Servicio.countDocuments(query),
    ]);

    res.status(200).json({
      servicios,
      cantidadTotal,
      paginaActual: paginaNumero,
      totalPaginas: Math.ceil(cantidadTotal / limite),
    });
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
    const servicioBuscado = await Servicio.findById(req.params.id).populate(
      "categoria",
      "nombre descripcion",
    );
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
    const servicioBorrado = await Servicio.findByIdAndDelete(req.params.id);
    if (!servicioBorrado) {
      return res
        .status(404)
        .json({ mensaje: "No se encontro un servicio con el id enviado" });
    }
    res
      .status(200)
      .json({ mensaje: "El servicio fue eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "Ocurrio un error al intentar borrar un servicio por id",
    });
  }
};
export const editarServicioPorID = async (req, res) => {
  try {
    //1. Preparamos los datos a actualizar copiando el body recibido
    const datosActualizados = { ...req.body };
    //2. Si el usuario subió una NUEVA imagen, la subimos a Cloudinary y reemplazamos la URL
    if (req.file) {
      const resultado = await subirImagenACloudinary(req.file.buffer);
      datosActualizados.imagen = resultado.secure_url;
    }
    //3. Actualizamos el documento y retornamos el nuevo estado ({ new: true })
    const servicioEditado = await Servicio.findByIdAndUpdate(
      req.params.id,
      datosActualizados,
      { new: true },
    );

    if (!servicioEditado) {
      return res
        .status(404)
        .json({ mensaje: "No se encontro un servicio con el id enviado" });
    }
    res.status(200).json({
      mensaje: "El servicio se actualizo correctamente",
      servicio: servicioEditado,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "Ocurrio un error al intentar editar un servicio por id",
    });
  }
};
