import { body } from "express-validator";
import resultadoValidacion from "./resultadoValidacion.js";

const validacionServicio = [
  body("nombreServicio")
    .notEmpty()
    .withMessage("El nombre del servicio es un dato obligatorio")
    .isString()
    .withMessage('El nombre de servicio debe ser un string'),
    resultadoValidacion
];

export default validacionServicio