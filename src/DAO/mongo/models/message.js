import mongoose from "mongoose";

const collection = "Messages";

// Definición del esquema para la colección "Messages"
const schema = new mongoose.Schema(
  {
    user: String,
    message: String,
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

// Creación del modelo "messageModel" basado en el esquema "schema"
const messageModel = mongoose.model(collection, schema);

export default messageModel;
