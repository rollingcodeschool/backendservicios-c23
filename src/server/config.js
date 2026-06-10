import express from "express";
import cors from "cors";
import morgan from "morgan";
import { dirname } from "path";
import { fileURLToPath } from "url";

export default class Server {
  // el objetivo del constructor es definir las propiedad del futuro objeto
  constructor() {
    this.app = express();
    this.PORT = process.env.PORT || 3000;
  }
  // aqui agregar el resto de los metodos del futuro objeto

  listen() {
    this.app.listen(this.PORT, () => {
      console.info(`Servidor activo en el puerto http://localhost:${this.PORT}`);
    });
  }
}
