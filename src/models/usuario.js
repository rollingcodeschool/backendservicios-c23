import mongoose, { Schema } from "mongoose";

const UsuarioSchema = new Schema(
  {
    nombreUsuario: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (valor) => {
          /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(valor);
        },
      },
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: (valor) => {
         /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,50}$/.test(
            valor,
          );
        },
      },
    },
    rol: {
      type: String,
      required: true,
      enum: ["Admin", "Cliente"],
      default:'Cliente'
    },
  },
  {
    timestamps: true,
  },
);

const Usuario = mongoose.model("usuario", UsuarioSchema);

export default Usuario;
