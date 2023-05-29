import { cartModel } from "../models/cart.js";
import ProductManager from "./products.js";

// Clase CartManager para gestionar los carritos
class CartManager {
  constructor() {
    this.productManager = new ProductManager();
  }

  // Obtener todos los carritos
  getCarts = async () => {
    try {
      return await cartModel.find();
    } catch (err) {
      console.log(err);
    }
  };

  // Obtener un carrito por su ID
  getCartById = async (cartId) => {
    try {
      return await cartModel.findOne({ _id: cartId });
    } catch (err) {
      return err;
    }
  };

  // Agregar un carrito con los productos especificados
  addCart = async (products) => {
    try {
      const cartCreated = await cartModel.create({});
      products.forEach((product) => cartCreated.products.push(product));
      await cartCreated.save();
      return cartCreated;
    } catch (err) {
      return err.message;
    }
  };

  // Agregar un producto a un carrito existente
  addProductInCart = async (cartId, productFromBody) => {
    try {
      const cart = await cartModel.findOne({ _id: cartId });
      const findProduct = cart.products.some((product) => product._id.toString() === productFromBody._id);

      if (findProduct) {
        await cartModel.updateOne({ _id: cartId, "products._id": productFromBody._id }, { $inc: { "products.$.quantity": productFromBody.quantity } });
      } else {
        cart.products.push({
          _id: productFromBody._id,
          quantity: productFromBody.quantity,
        });
      }

      await cart.save();
      return await cartModel.findOne({ _id: cartId });
    } catch (err) {
      console.log(err.message);
      return err;
    }
  };

  // Eliminar productos de un carrito
  deleteProductInCart = async (cartId, products) => {
    try {
      return await cartModel.findOneAndUpdate({ _id: cartId }, { products }, { new: true });
    } catch (err) {
      return err;
    }
  };

  // Actualizar los productos de un carrito
  updateProductsInCart = async (cartId, products) => {
    try {
      return await cartModel.findOneAndUpdate({ _id: cartId }, { products }, { new: true });
    } catch (err) {
      return err;
    }
  };

  // Actualizar un producto específico de un carrito
  updateOneProduct = async (cartId, products) => {
    await cartModel.updateOne({ _id: cartId }, { products });
    return await cartModel.findOne({ _id: cartId });
  };
}

export default CartManager;
