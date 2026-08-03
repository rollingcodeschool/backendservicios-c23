import {Router} from 'express';
import { agregarAlCarrito } from '../controllers/carrito.controllers.js';
import { autenticador } from '../middlewares/authMiddlwares.js';

const router = Router();

router.route('/').post(autenticador,agregarAlCarrito)

export default router