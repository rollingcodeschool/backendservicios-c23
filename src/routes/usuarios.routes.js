import { Router } from "express";
import { crearusuario } from "../controllers/usuarios.controllers.js";


const router = Router()
//http://localhost:3000/api/usuarios/

router.route('/').post(crearusuario)

export default router