import { cartModel } from "../models/cart.js";
import { Types } from "mongoose";
import ProductManager from "./products.js";

const pm = new ProductManager();

class CartManager {
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
      console.log(err);
      return err;
    }
  };

  // Agregar un carrito con productos
  addCart = async (products) => {
    try {
      const cartCreated = await cartModel.create({});
      products.forEach((product) => cartCreated.products.push(product));
      await cartCreated.save(); // Guardar el carrito en la base de datos
      return cartCreated;
    } catch (err) {
      console.log(err.message);
      return err.message;
    }
  };

  // Agregar un producto en un carrito existente
  addProductInCart = async (cartId, productFromBody) => {
    try {
      const cart = await cartModel.findOne({ _id: cartId });

      const findProduct = cart.products.some((product) => product._id.toString() === productFromBody._id);

      if (findProduct) {
        // Si el producto ya existe en el carrito, actualizar su cantidad
        await cartModel.updateOne({ _id: cartId, "products._id": productFromBody._id }, { $inc: { "products.$.quantity": productFromBody.quantity } });
        return await cartModel.findOne({ _id: cartId });
      }

      // Si el producto no existe en el carrito, agregarlo al array de productos
      await cartModel.updateOne(
        { _id: cartId },
        {
          $push: {
            products: {
              _id: productFromBody._id,
              quantity: productFromBody.quantity,
            },
          },
        }
      );
      return await cartModel.findOne({ _id: cartId });
    } catch (err) {
      console.log(err.message);
      return err;
    }
  };
}

export default CartManager;
