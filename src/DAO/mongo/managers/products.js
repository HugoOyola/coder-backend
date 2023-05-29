import productModel from "../models/product.js";

export default class ProductManager {
  // Obtener todas las categorías de productos
  categories = async () => {
    try {
      const categories = await productModel.aggregate([
        {
          $group: {
            _id: null,
            categories: { $addToSet: "$category" },
          },
        },
      ]);

      return categories[0].categories;
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  // Obtener todos los productos para visualización
  getProductsView = async () => {
    try {
      return await productModel.find().lean();
    } catch (err) {
      return err;
    }
  };

  // Obtener productos con filtros y opciones de paginación
  getProducts = async (filter, options) => {
    try {
      return await productModel.paginate(filter, options);
    } catch (err) {
      return err;
    }
  };

  // Obtener un producto por su ID
  getProductById = async (id) => {
    try {
      return await productModel.findById(id);
    } catch (err) {
      return { error: err.message };
    }
  };

  // Agregar un nuevo producto
  addProduct = async (product) => {
    try {
      await productModel.create(product);
      return await productModel.findOne({ code: product.code });
    } catch (err) {
      return err;
    }
  };

  // Actualizar un producto existente por su ID
  updateProduct = async (id, product) => {
    try {
      return await productModel.findByIdAndUpdate(id, { $set: product });
    } catch (err) {
      return err;
    }
  };

  // Eliminar un producto por su ID
  deleteProduct = async (id) => {
    try {
      return await productModel.findByIdAndDelete(id);
    } catch (err) {
      return err;
    }
  };
}
