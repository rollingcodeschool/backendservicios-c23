import { Router } from "express";
import serviciosRouter from "./servicios.routes.js";
//http://localhost:3000/api/servicios/

const router = Router()

router.use('/servicios', serviciosRouter)

export default router