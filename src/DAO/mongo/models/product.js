import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "Products";

// Definición del esquema para la colección "Products"
const schema = new mongoose.Schema({
  title: {
    type: String,
    index: true,
  },
  description: String,
  price: Number,
  code: {
    type: String,
    unique: true,
  },
  stock: Number,
  status: {
    type: Boolean,
    default: true,
  },
  category: String,
  thumbnails: [],
});

// Agregar el plugin "mongoosePaginate" al esquema para habilitar la paginación
schema.plugin(mongoosePaginate);

// Creación del modelo "productModel" basado en el esquema "schema"
const productModel = mongoose.model(collection, schema);

export default productModel;
