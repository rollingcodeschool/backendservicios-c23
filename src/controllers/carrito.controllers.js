import Servicio from "../models/servicio.js";
import buscarOCrearCarrito from "../utils/buscarCarrito.js";
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
    const carrito = await buscarOCrearCarrito(userId)
    const itemIndex = carrito.items.findIndex((item)=> item.servicio.toString() === servicio)
    //tengo este servicio en el carrito
    if(itemIndex > -1){
        carrito.items[itemIndex].cantidad += parseInt(cantidad)
    }else{
        //agregar el servicio al carrito
        carrito.items.push({
            servicio,
            cantidad
        })
    }
    console.log(carrito.items)
    await carrito.save() 
    //agregar el nombre del servicio al carrito
    await carrito.populate('items.servicio', 'nombreServicio precio')

    res.status(201).json({
        mensaje: 'Servicio agregado al carrito correctamente',
        carrito
    })
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Ocurrio un error al agregar un elemento al carrito" });
  }
};
