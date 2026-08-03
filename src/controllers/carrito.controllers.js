import Servicio from "../models/servicio.js";
export const agregarAlCarrito = async (req, res) => {
  try {
    const { servicio, cantidad } = req.body;
    const userId = req.user.id;
    //verificar si el servicio existe
    const servicioBuscado = await Servicio.findById(servicio);
    if (!servicioBuscado) {
      return res
        .status(404)
        .json({ mensaje: "El servicio solicitado no existe" });
    }
    //buscar o crear el carrito
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Ocurrio un error al agregar un elemento al carrito" });
  }
};
