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
import upload from "../middlewares/upload.js";
import errorMulter from "../middlewares/errorMulter.js";

const router = Router();
//http://localhost:3000/api/servicios/dfgdfgdf
//get - obtener informacion
// post - crear algo
// put o patch - modificar algo
//delete - borrar algo

router
  .route("/")
  .get(listarServicios)
  .post([autenticador, esAdmin, upload.single('imagen'), errorMulter , validacionServicio],  crearServicio);
  // .post([autenticador, esAdmin, validacionServicio], crearServicio);
router
  .route("/:id")
  .get(validacionIDServicio, obtenerServicioPorID)
  .delete([autenticador, esAdmin, validacionIDServicio], borrarServicioPorID)
  .put(
    [autenticador, esAdmin,upload.single('imagen'), errorMulter ,validacionIDServicio, validacionServicio],
    editarServicioPorID,
  )
  .patch([autenticador, esAdmin, validacionServicioPatch], editarServicioPorID);

export default router;
