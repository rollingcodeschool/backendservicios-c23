import { Router } from "express";
import { crearPreferenciaPago } from "../controllers/pago.controllers.js";
import { autenticador } from "../middlewares/authMiddlwares.js";

const router = Router();

router.route("/crear-preferencia").post(autenticador, crearPreferenciaPago)

export default router;
