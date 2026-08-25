import { Router } from "express";
import {
  agregarAlCarrito,
  eliminarServicio,
  obtenerCarrito,
  restarCantidad,
  vaciarCarrito,
} from "../controllers/carrito.controllers.js";
import { autenticador } from "../middlewares/authMiddlwares.js";

const router = Router();

router
  .route("/")
  .post(autenticador, agregarAlCarrito)
  .get(autenticador, obtenerCarrito)
  .delete(autenticador, vaciarCarrito);

router.route('/restar/:servicioId').patch(autenticador,restarCantidad)  
router.route('/servicio/:servicioId').delete(autenticador,eliminarServicio)
export default router;
