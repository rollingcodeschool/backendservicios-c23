import Usuario from "../models/usuario.js";
import { transporter } from "../utils/mailer.js";

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
