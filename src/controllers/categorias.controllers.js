import Categoria from "../models/categoria.js";

export const crearCategoria = async (req, res) => {
  try {
    //todo: agregar el middleware para validar los datos del body
    const categoriaNueva = new Categoria(req.body);
    await categoriaNueva.save();
    res.status(201).json({ mensaje: "se creo la categoria correctamente" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Se produjo un error al crear una categoria" });
  }
};

export const listarCategorias = async(req, res)=>{
  try{
    const categorias = await Categoria.find();
    res.status(200).json(categorias)
  }catch(error){
     console.error(error);
    res
      .status(500)
      .json({ mensaje: "Se produjo un error al listar las categorias" });
  }
}