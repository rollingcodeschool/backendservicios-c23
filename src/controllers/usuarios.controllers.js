import jwt from "jsonwebtoken";
import Usuario from "../models/usuario.js";
import { transporter } from "../utils/mailer.js";
import bcrypt from "bcryptjs";

export const crearusuario = async (req, res) => {
  try {
    //falta hashear el password
    const usuarioNuevo = new Usuario(req.body);
    //aqui quiero guardar en la BD
    await usuarioNuevo.save();
    res.status(201).json({ mensaje: "El usuario fue creado exitosamente" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .post({ mensaje: "Ocurrio un error, no se pudo crear el usuario" });
  }
};

export const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.status(200).json(usuarios);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Ocurrio un error al listar los usuarios" });
  }
};

export const registrarUsuario = async (req, res) => {
  try {
    //1- recibir el req
    const { nombreUsuario, email, password, rol } = req.body;
    // const usuarioExistente = await Usuario.findOne({email: req.body.email})
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res
        .status(409)
        .json({ mensaje: "El email enviado ya esta registrado" });
    }
    //2- generar un codigo de verificacion
    const codigoVerificacion = Math.floor(
      100000 + Math.random() * 900000,
    ).toString(); //100000 - 999999

    //calcular fecha de expiracion
    const tiempoExpiracion = new Date(Date.now() + 15 * 60 * 1000);

    //3- crear el usuario y enviar por email el codigo
    const datosUsuario = {
      nombreUsuario,
      email,
      password,
      codigoVerificacion,
      fechaExpiracionCodigo: tiempoExpiracion,
    };

    if (rol && rol.trim() !== "") {
      datosUsuario.rol = rol;
    }
    //4- guardar el dato en el usuario
    const usuarioNuevo = await Usuario.create(datosUsuario);
    //5- enviar el mail
    await transporter.sendMail({
      from: '"Crud Servicios" <no-reply@crud-servicios.com>',
      to: email,
      subject: "🔑 Código de Verificación de Cuenta",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
          <h2 style="color: #333; text-align: center;">¡Hola, ${nombreUsuario}!</h2>
          <p style="color: #666; font-size: 16px; line-height: 1.5;">
            Gracias por registrarte. Para activar tu cuenta y poder ingresar a la plataforma, por favor utiliza el siguiente código de verificación:
          </p>
          <div style="background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; margin: 20px 0; border-radius: 4px; color: #007bff;">
            ${codigoVerificacion}
          </div>
          <p style="color: #999; font-size: 12px; text-align: center;">
            Este código vencerá en 15 minutos. Si no solicitaste este registro, puedes ignorar este correo de forma segura.
          </p>
        </div>
      `,
    });
    //6- enviar respuesta
    res.status(201).json({ mensaje: "El usuario fue creado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Ocurrio un error al registrar usuarios" });
  }
};

export const confirmarCodigoVerificacion = async (req, res) => {
  try {
    const { email, codigo } = req.body;
    //buscar el email del usuario
    const usuarioBuscado = await Usuario.findOne({ email });
    if (!usuarioBuscado) {
      return res
        .status(404)
        .json({ mensaje: "No se encontro ningún usuario con ese email" });
    }
    //chequear si el estado es verificado
    if (usuarioBuscado.verificado) {
      return res
        .status(400)
        .json({ mensaje: "Esta cuenta ya esta verificada" });
    }

    //chequear que el tiempo de expiracion del codigo siga vigente
    if (new Date() > usuarioBuscado.fechaExpiracionCodigo) {
      return res.status(400).json({
        mensaje:
          "El código esta expirado. Por favor, solicita un nuevo código.",
      });
    }

    if (usuarioBuscado.codigoVerificacion !== codigo) {
      return res
        .status(400)
        .json({ mensaje: "El código de verificación es incorrecto." });
    }
    //aqui verificamos la cuenta del usuario
    await Usuario.findByIdAndUpdate(usuarioBuscado._id, {
      $set: { verificado: true },
      $unset: { codigoVerificacion: 1, fechaExpiracionCodigo: 1 },
    });

    res.status(200).json({
      mensaje: "Cuenta verificada con exito. Ya puedes iniciar sesión.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje:
        "Ocurrio un error al validar el codigo de verificacion del usuario",
    });
  }
};

export const solicitarNuevoCodigo = async (req, res) => {
  try {
    const { email } = req.body;
    //verificar que existe un usuario con el mail enviado
    const usuarioBuscado = await Usuario.findOne({ email });
    if (!usuarioBuscado) {
      return res.status(404).json({
        mensaje: "No se encontró ningun usuario con el email enviado",
      });
    }

    //verficamos que el usuario aún no fue validado
    if (usuarioBuscado.verificado) {
      return res
        .status(400)
        .json({ mensaje: "Esta cuenta ya esta verificada" });
    }

    //chequear que el tiempo de expiracion del codigo siga vigente, si quiero reenviar el codigo solo una vez que a expirado el primer codigo generado
    // if(new Date() < usuarioBuscado.fechaExpiracionCodigo){
    //     return res.status(400).json({mensaje: "verificar el correo con el código enviado"})
    // }

    //generar un nuevo codigo y calcular el nuevo tiempo de expiración

    const codigoVerificacion = Math.floor(
      100000 + Math.random() * 900000,
    ).toString(); //100000 - 999999
    const tiempoExpiracion = new Date(Date.now() + 15 * 60 * 1000);

    //actualizamos el dato en la BD
    await Usuario.findByIdAndUpdate(usuarioBuscado._id, {
      codigoVerificacion,
      fechaExpiracionCodigo: tiempoExpiracion,
    });

    //reenviar el mail con el nuevo codigo
    await transporter.sendMail({
      from: '"Crud Servicios" <no-reply@crud-servicios.com>',
      to: email,
      subject: "Nuevo 🔑 Código de Verificación de Cuenta",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
          <h2 style="color: #333; text-align: center;">¡Hola, ${usuarioBuscado.nombreUsuario}!</h2>
          <p style="color: #666; font-size: 16px; line-height: 1.5;">
            Has solicitado un nuevo código para activar tu cuenta y poder ingresar a la plataforma, por favor utiliza el siguiente código de verificación:
          </p>
          <div style="background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; margin: 20px 0; border-radius: 4px; color: #007bff;">
            ${codigoVerificacion}
          </div>
          <p style="color: #999; font-size: 12px; text-align: center;">
            Este código vencerá en 15 minutos. Si no solicitaste este registro, puedes ignorar este correo de forma segura.
          </p>
        </div>
      `,
    });

    //enviar respuesta al cliente
    res
      .status(200)
      .json({ mensaje: "El nuevo código de verificación fue enviado." });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "Ocurrio un error al crear un nuevo código de verificación",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //verificar si el mail es valido
    const usuarioBuscado = await Usuario.findOne({ email });
    if (!usuarioBuscado) {
      return res
        .status(401)
        .json({ mensaje: "Credenciales invalidas - email" });
    }
    //verificar el password

    if (!(await bcrypt.compare(password, usuarioBuscado.password))) {
      return res
        .status(401)
        .json({ mensaje: "Credenciales invalidas - password" });
    }

    //chequear que el usuario este verificado
    if (!usuarioBuscado.verificado) {
      return res
        .status(403)
        .json({ mensaje: "Tu cuenta no fue verificada aún" });
    }

    //generar el token
    const token = jwt.sign(
      { id: usuarioBuscado._id, rol: usuarioBuscado.rol },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000,
    });
    res
      .status(200)
      .json({ mensaje: "Login exitoso", nombre: usuarioBuscado.nombreUsuario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Ocurrio un error al loguear un usuario" });
  }
};

export const logout = async(req, res)=>{
    try{
      res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000,
    })
    res.status(200).json({mensaje: 'sesión cerrada exitosamente'})
    }catch(error){
      console.error(error)
      res.status(500).json({mensaje: 'Ocurrio al intentar cerrar sesión'})
    }
}

export const obtenerPerfil = async(req, res) => {
  try{

  }catch(error){
    console.error(error)
  }
}