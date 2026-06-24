import { body, param } from "express-validator";
import resultadoValidacion from "./resultadoValidacion.js";

export const validacionServicio = [
  body("nombreServicio")
    .notEmpty()
    .withMessage("El nombre del servicio es un dato obligatorio")
    .isString()
    .withMessage("El nombre de servicio debe ser un string")
    .isLength({ min: 5, max: 100 })
    .withMessage("El nombre servicio debe contener entre 5 y 100 caracteres"),
  body("precio")
    .notEmpty()
    .withMessage("El precio es un dato obligatorio")
    .isNumeric()
    .withMessage("El precio debe ser un valor numerico")
    .isFloat({ min: 50 })
    .withMessage("El precio debe ser desde $50"),
  body("categoria")
    .notEmpty()
    .withMessage("La categoria es un dato obligatorio")
    .isString()
    .withMessage("La categoria debe ser un string")
    .isIn(["Desarrollo Web", "Backend & API", "Consultoría"])
    .withMessage(
      "La categoria debe ser algunos de los siguientes valores: 'Desarrollo Web', 'Backend & API', 'Consultoría'",
    ),
  body("imagen")
    .notEmpty()
    .withMessage("La imagen es un dato obligatorio")
    .isString()
    .withMessage("La imagen debe ser un string")
    .matches(/^https:\/\/.+\.(jpg|jpeg|png|webp|avif|svg)$/)
    .withMessage(
      "La imagen debe ser una url valida terminada en jpg|jpeg|png|webp|avif|svg",
    ),
  body("descripcion")
    .notEmpty()
    .withMessage("La descripción es un dato obligatorio")
    .isString()
    .withMessage("La descripción debe ser un string")
    .isLength({ min: 10, max: 500 })
    .withMessage("La descripción debe contener entre 10 y 500 caracteres"),

  resultadoValidacion,
];

export const validacionIDServicio = [
  param("id")
    .isMongoId()
    .withMessage(
      "El id no corresponde con el formato correcto del id de mongoDB",
    ),
  resultadoValidacion,
];
