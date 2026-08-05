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
    const carrito = await buscarOCrearCarrito(userId);

    const itemIndex = carrito.items.findIndex(
      (item) => item.servicio.toString() === servicio,
    );
    //tengo este servicio en el carrito
    if (itemIndex > -1) {
      carrito.items[itemIndex].cantidad += parseInt(cantidad);
    } else {
      //agregar el servicio al carrito
      carrito.items.push({
        servicio,
        cantidad,
      });
    }
    console.log(carrito.items);
    await carrito.save();
    //agregar el nombre del servicio al carrito
    await carrito.populate("items.servicio", "nombreServicio precio");

    res.status(201).json({
      mensaje: "Servicio agregado al carrito correctamente",
      carrito,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Ocurrio un error al agregar un elemento al carrito" });
  }
};

export const obtenerCarrito = async (req, res) => {
  try {
    const userId = req.user.id;
    const carrito = await buscarOCrearCarrito(userId);

    await carrito.populate("items.servicio", "nombreServicio precio imagen");

    res.status(200).json(carrito);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Ocurrio un error al obtener el carrito" });
  }
};

export const vaciarCarrito = async (req, res) => {
  try {
    const userId = req.user.id;
    const carrito = await buscarOCrearCarrito(userId);
    //limiar el array de items
    carrito.items = [];

    await carrito.save();
    res
      .status(200)
      .json({ mensaje: "El carrito fue vaciado correctamente", carrito });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Ocurrio un error al intentar vaciar el carrito" });
  }
};

export const restarCantidad = async(req, res)=>{
  try{
    const userId = req.user.id
    const {servicioId} = req.params

    const carrito = await buscarOCrearCarrito(userId)
    const itemIndex = carrito.items.findIndex((item)=> item.servicio.toString() === servicioId )
    //verificamos si no encuentramos el servicio en el array de items del carrito
    if(itemIndex === -1){
      return res.status(404).json({mensaje: 'El servicio no se encuentra en el carrito'})
    }

    //restar la cantidad del servicio
    carrito.items[itemIndex].cantidad -=1

    if(carrito.items[itemIndex].cantidad <= 0 ){
      //eliminar el servicio del array
      carrito.items.splice(itemIndex,1)
    }

    //actualizar el carrito
    await carrito.save()

    res.status(200).json(carrito)

  }catch(error){
      console.error(error);
    res
      .status(500)
      .json({ mensaje: "Ocurrio un error al intentar restar la cantidad de un servicio" });
  }
}