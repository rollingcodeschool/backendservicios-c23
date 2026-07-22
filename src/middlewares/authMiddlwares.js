import jwt from "jsonwebtoken";

export const autenticador = (req, res, next) => {
  try {
    const token = req.cookies.token;
    //hay un token
    if (!token) {
      return res
        .status(401)
        .json({ mensaje: "Acceso no autorizado, token faltante." });
    }
    //verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //guardar los datos en el request
    console.log(decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(403).json({mensaje:'Token inválido o expirado'})
  }
};
