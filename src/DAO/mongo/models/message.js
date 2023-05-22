import mongoose from "mongoose";

const collection = "Messages";

// Definición del esquema de la colección de mensajes
const schema = new mongoose.Schema(
  {
    user: String, // Campo para el usuario
    message: String, // Campo para el mensaje
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }, // Opciones para los timestamps de creación y actualización
  }
);

// Creación y exportación del modelo de mensaje
const messageModel = mongoose.model(collection, schema);
export default messageModel;
