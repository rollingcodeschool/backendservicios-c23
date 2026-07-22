import { Router } from "express";
import {
  confirmarCodigoVerificacion,
  crearusuario,
  listarUsuarios,
  login,
  obtenerPerfil,
  registrarUsuario,
  solicitarNuevoCodigo,
} from "../controllers/usuarios.controllers.js";
import { autenticador } from "../middlewares/authMiddlwares.js";

const router = Router();
//http://localhost:3000/api/usuarios/

router.route("/").post(crearusuario).get(listarUsuarios);
router.route("/registro").post(registrarUsuario);
router.route("/verificar-cuenta").post(confirmarCodigoVerificacion);
router.route("/reenviar-codigo").post(solicitarNuevoCodigo);
router.route("/login").post(login);

//ruta privada
router.route("/perfil").get(autenticador,obtenerPerfil);

// router.route('/:id').get(listarUsuarios)

export default router;
