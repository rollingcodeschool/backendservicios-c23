import { Router } from "express";
import { crearServicio, listarServicios, prueba } from "../controllers/servicios.controllers.js";

const router = Router()
//http://localhost:3000/api/servicios/
//get - obtener informacion
// post - crear algo
// put o patch - modificar algo
//delete - borrar algo

router.route('/test').get(prueba)
router.route('/').post(crearServicio).get(listarServicios)

export default router