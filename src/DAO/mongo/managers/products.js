import productModel from "../models/product.js";
import { Types } from "mongoose";

export default class ProductManager {
  // Obtener todos los productos
  getProducts = async () => {
    try {
      return await productModel.find().lean();
    } catch (err) {
      return err;
    }
  }

  // Obtener un producto por su ID
  getProductById = async (id) => {
    try {
      return await productModel.findById(id);
    } catch (err) {
      return { error: err.message };
    }
  }

  // Agregar un nuevo producto
  addProduct = async (product) => {
    try {
      await productModel.create(product);
      return await productModel.findOne({ title: product.title });
    } catch (err) {
      return err;
    }
  }

  // Actualizar un producto existente por su ID
  updateProduct = async (id, product) => {
    try {
      return await productModel.findByIdAndUpdate(id, { $set: product });
    } catch (err) {
      return err;
    }
  }

  // Eliminar un producto por su ID
  deleteProduct = async (id) => {
    try {
      return await productModel.findByIdAndDelete(id);
    } catch (err) {
      return err;
    }
  }
}
