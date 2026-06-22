import { Router } from "express";
import { borrarServicioPorID, crearServicio, listarServicios, obtenerServicioPorID, prueba } from "../controllers/servicios.controllers.js";

const router = Router()
//http://localhost:3000/api/servicios/dfgdfgdf
//get - obtener informacion
// post - crear algo
// put o patch - modificar algo
//delete - borrar algo

router.route('/test').get(prueba)
router.route('/').post(crearServicio).get(listarServicios)
router.route('/:id').get(obtenerServicioPorID).delete(borrarServicioPorID)
export default router