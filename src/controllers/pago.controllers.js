import {MercadoPagoConfig, Preference} from "mercadopago"
import buscarOCrearCarrito from "../utils/buscarCarrito.js";
import Orden from "../models/orden.js";

// inicializar el cliente de mercado 
const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });

export const crearPreferenciaPago = async(req, res)=>{
    try {
        const userId = req.user.id
        const carrito = await buscarOCrearCarrito(userId)
        await carrito.populate('items.servicio')
        //verficiar si el carrito esta vacio
        if(carrito.items.length === 0 ){
            return res.status(400).json({mensaje:'El carrito esta vacio'})
        }
        //estructurar los datos del carrito para armar la orden de pago y la preferencia de MP
        let montoTotal = 0;
        const itemsMP = carrito.items.map((item)=>{
            const subtotal = item.servicio.precio * item.cantidad
            montoTotal += subtotal
            return{
                id: item.servicio._id.toString(),
                title: item.servicio.nombreServicio,
                unit_price: Number(item.servicio.precio),
                quantity: Number(item.cantidad),
                currency_id: "ARS",
                picture_url: item.servicio.imagen
            }
        })
        //armar los datos para la orden
        const itemsOrden = carrito.items.map((item)=>({
            servicio: item.servicio._id,
            nombreServicio: item.servicio.nombreServicio,
            precioUnitario: item.servicio.precio,
            cantidad: item.cantidad
        }))

        const nuevaOrden = new Orden({
            usuario: userId,
            items: itemsOrden,
            montoTotal,
            estado: 'pendiente'
        })
        //guardar la orden de pago
        await nuevaOrden.save()

        //creamos la preferencia y se la enviamos a MP
        const preference = new Preference(client);

        const result = await preference.create({
            body:{
                items: itemsMP,
                external_reference: nuevaOrden._id.toString(),
                //todo: aqui trabajar con el webhook
                back_urls:{
                    success: `${PAYMENT_FRONTEND_URL}/checkout/resultado?status=success`,
                    failure: `${PAYMENT_FRONTEND_URL}/checkout/resultado?status=failure`,
                    pending: `${PAYMENT_FRONTEND_URL}/checkout/resultado?status=pending`,
                },
                auto_return: 'approved'    
            }
        })
        //actualizamos el preference id con el devuelto por MP
        nuevaOrden.preferenceId= result.id;
        await nuevaOrden.save()

        //respuesta al front
        res.status(201).json({
            mensaje: 'Preferencia de pago creada con exito',
            init_point: result.init_point, // redireccion a MP
            sandbox_init_point: result.sandbox_init_point,
            ordenId: nuevaOrden._id
        } )
    } catch (error) {
        console.error(error)
        res.status(500).json({mensaje:'Ocurrio un error al crear la preferencia de pago'})
    }
}