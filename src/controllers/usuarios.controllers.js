import Usuario from "../models/usuario.js";

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

export const registrarUsuario = async(req, res) =>{
  try{
    //1- recibir el req

    //2- generar un codigo de verificacion

    //3- crear el usuario y enviar por email el codigo

    //4- guardar el dato en el usuario

  }catch(error){
      console.error(error);
    res
      .status(500)
      .json({ mensaje: "Ocurrio un error al registrar usuarios" });
  }
}