import { Router } from "express";
import {
  borrarServicioPorID,
  crearServicio,
  editarServicioPorID,
  listarServicios,
  obtenerServicioPorID,
} from "../controllers/servicios.controllers.js";
import {
  validacionIDServicio,
  validacionServicio,
  validacionServicioPatch,
} from "../middlewares/validacionServicio.js";
import { autenticador, esAdmin } from "../middlewares/authMiddlwares.js";

const router = Router();
//http://localhost:3000/api/servicios/dfgdfgdf
//get - obtener informacion
// post - crear algo
// put o patch - modificar algo
//delete - borrar algo

router.route("/").post([autenticador,esAdmin, validacionServicio], crearServicio).get(listarServicios);
router
  .route("/:id")
  .get(validacionIDServicio, obtenerServicioPorID)
  .delete([autenticador,esAdmin,validacionIDServicio], borrarServicioPorID)
  .put([autenticador,esAdmin,validacionIDServicio, validacionServicio], editarServicioPorID)
  .patch([autenticador,esAdmin, validacionServicioPatch], editarServicioPorID);

export default router;
