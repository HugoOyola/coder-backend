import mongoose, { Schema, model } from "mongoose";

const cartCollection = "Carts";

// Definición del esquema de la colección de carritos
const cartSchema = new Schema({
  products: {
    type: [
      {
        _id: {
          type: mongoose.Types.ObjectId,
          ref: "Products", // Referencia a la colección "Products"
        },
        quantity: {
          type: Number,
          default: 1, // Valor por defecto de la cantidad: 1
        },
      },
    ],
    default: [], // Valor por defecto del array de productos: vacío
  },
});

// Creación y exportación del modelo de carrito
export const cartModel = model(cartCollection, cartSchema);
