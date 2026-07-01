import { Router } from "express";
import { crearusuario, listarUsuarios } from "../controllers/usuarios.controllers.js";


const router = Router()
//http://localhost:3000/api/usuarios/

router.route('/').post(crearusuario).get(listarUsuarios)
// router.route('/:id').get(listarUsuarios)

export default router