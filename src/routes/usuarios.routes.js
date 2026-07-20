import { Router } from "express";
import {
  confirmarCodigoVerificacion,
  crearusuario,
  listarUsuarios,
  login,
  registrarUsuario,
  solicitarNuevoCodigo,
} from "../controllers/usuarios.controllers.js";

const router = Router();
//http://localhost:3000/api/usuarios/

router.route("/").post(crearusuario).get(listarUsuarios);
router.route("/registro").post(registrarUsuario);
router.route("/verificar-cuenta").post(confirmarCodigoVerificacion);
router.route("/reenviar-codigo").post(solicitarNuevoCodigo);
router.route("/login").post(login);
router.route("/perfil").get((req, res) => {
  res.status(200).json({ mensaje: "Bienvenido a tu perfil" });
});

// router.route('/:id').get(listarUsuarios)

export default router;
