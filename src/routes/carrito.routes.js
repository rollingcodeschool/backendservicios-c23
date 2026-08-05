import {Router} from 'express';
import { agregarAlCarrito, obtenerCarrito } from '../controllers/carrito.controllers.js';
import { autenticador } from '../middlewares/authMiddlwares.js';

const router = Router();

router.route('/').post(autenticador,agregarAlCarrito).get(autenticador, obtenerCarrito)

export default router