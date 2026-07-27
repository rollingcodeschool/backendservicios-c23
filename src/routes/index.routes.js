import { Router } from "express";
import serviciosRouter from "./servicios.routes.js";
import usuariosRouter from "./usuarios.routes.js";
import categoriasRouter from "./categorias.routes.js";
//http://localhost:3000/api/servicios/
//http://localhost:3000/api/usuarios/

const router = Router()

router.use('/servicios', serviciosRouter)
router.use('/usuarios',usuariosRouter )
router.use('/categorias',categoriasRouter )

export default router