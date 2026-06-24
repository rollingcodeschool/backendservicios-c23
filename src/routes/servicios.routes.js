import { Router } from "express";
import { borrarServicioPorID, crearServicio, editarServicioPorID, listarServicios, obtenerServicioPorID, prueba } from "../controllers/servicios.controllers.js";
import {validacionIDServicio, validacionServicio} from "../middlewares/validacionServicio.js";

const router = Router()
//http://localhost:3000/api/servicios/dfgdfgdf
//get - obtener informacion
// post - crear algo
// put o patch - modificar algo
//delete - borrar algo

router.route('/test').get(prueba)
router.route('/').post( validacionServicio,crearServicio).get(listarServicios)
router.route('/:id').get(validacionIDServicio,obtenerServicioPorID).delete(validacionIDServicio,borrarServicioPorID).put([validacionIDServicio, validacionServicio], editarServicioPorID).patch(editarServicioPorID)
export default router