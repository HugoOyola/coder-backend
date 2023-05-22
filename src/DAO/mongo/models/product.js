import mongoose from "mongoose";

const collection = "Products";

// Definición del esquema de la colección de productos
const schema = new mongoose.Schema({
  title: String, // Título del producto
  description: String, // Descripción del producto
  price: Number, // Precio del producto
  code: {
    type: String,
    unique: true, // Código único del producto
  },
  stock: Number, // Stock del producto
  status: {
    type: Boolean,
    default: true, // Estado del producto (por defecto: activo)
  },
  category: String, // Categoría del producto
  thumbnails: [], // Imágenes en miniatura del producto
});

// Creación y exportación del modelo de producto
const productModel = mongoose.model(collection, schema);
export default productModel;
