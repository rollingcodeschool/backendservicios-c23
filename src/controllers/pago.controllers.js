import {MercadoPagoConfig, Preference} from "mercadopago"
import buscarOCrearCarrito from "../utils/buscarCarrito.js";

// inicializar el cliente de mercado 
const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });

export const crearPreferenciaPago = async(req, res)=>{
    try {
        const userId = req.user.id
        const carrito = await buscarOCrearCarrito(userId)
        
    } catch (error) {
        console.error(error)
        res.status(500).json({mensaje:'Ocurrio un error al crear la preferencia de pago'})
    }
}