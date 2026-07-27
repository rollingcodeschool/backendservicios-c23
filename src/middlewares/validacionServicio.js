import { body, param } from "express-validator";
import resultadoValidacion from "./resultadoValidacion.js";
import Servicio from "../models/servicio.js";

const reglasServicio = [
  body("nombreServicio")
    .isString()
    .withMessage("El nombre de servicio debe ser un string")
    .isLength({ min: 5, max: 100 })
    .withMessage("El nombre servicio debe contener entre 5 y 100 caracteres")
    .custom(async (valor, { req }) => {
      const servicioBuscado = await Servicio.findOne({ nombreServicio: valor });
      console.log(servicioBuscado);
      //pregunto si no existe el servicio buscado
      if (!servicioBuscado) {
        return true;
      }
      //verificar si estoy editando
      if (req.params?.id && servicioBuscado._id.toString() === req.params.id) {
        return true;
      }
      //si ya existe el nombre del servicio buscando retorno error
      throw new Error(
        "El nombre del servicio ya existe en la base de datos, debes crear un nombre nuevo",
      );
    }),
  body("precio")
    .isNumeric()
    .withMessage("El precio debe ser un valor numerico")
    .isFloat({ min: 50 })
    .withMessage("El precio debe ser desde $50"),
  // body("categoria")
  //   .isString()
  //   .withMessage("La categoria debe ser un string")
  //   .isIn(["Desarrollo Web", "Backend & API", "Consultoría"])
  //   .withMessage(
  //     "La categoria debe ser algunos de los siguientes valores: 'Desarrollo Web', 'Backend & API', 'Consultoría'",
  //   ),
  body("imagen")
    .isString()
    .withMessage("La imagen debe ser un string")
    .matches(/^https:\/\/.+\.(jpg|jpeg|png|webp|avif|svg)$/)
    .withMessage(
      "La imagen debe ser una url valida terminada en jpg|jpeg|png|webp|avif|svg",
    ),
  body("descripcion")
    .isString()
    .withMessage("La descripción debe ser un string")
    .isLength({ min: 10, max: 500 })
    .withMessage("La descripción debe contener entre 10 y 500 caracteres"),
];
//para validar en post y put
export const validacionServicio = [
  ...reglasServicio.map((regla) =>
    regla.notEmpty().withMessage("Este campo es obligatorio"),
  ),
  resultadoValidacion,
];

//patch
export const validacionServicioPatch = [
  ...reglasServicio.map((regla) => regla.optional({values: 'falsy'})), resultadoValidacion
];

export const validacionIDServicio = [
  param("id")
    .isMongoId()
    .withMessage(
      "El id no corresponde con el formato correcto del id de mongoDB",
    ),
  resultadoValidacion,
];
