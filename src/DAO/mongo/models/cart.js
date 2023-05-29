import mongoose, { Schema, model } from 'mongoose';

const cartCollection = 'Carts';

// Definición del esquema de la colección "Carts"
const cartSchema = new Schema({
  products: {
    type: [
      {
        _id: {
          type: mongoose.Types.ObjectId,
          ref: 'Products',
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    default: [],
  },
});

// Pre-hook para realizar la operación "populate" en la consulta "findOne"
cartSchema.pre('findOne', function (next) {
  this.populate('products._id');
  next();
});

// Creación del modelo "cartModel" basado en el esquema "cartSchema"
export const cartModel = model(cartCollection, cartSchema);
