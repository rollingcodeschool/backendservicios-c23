import { Router } from "express";
import { crearusuario, listarUsuarios, registrarUsuario } from "../controllers/usuarios.controllers.js";


const router = Router()
//http://localhost:3000/api/usuarios/

router.route('/').post(crearusuario).get(listarUsuarios)
router.route('/registro').post(registrarUsuario)
// router.route('/:id').get(listarUsuarios)

export default router