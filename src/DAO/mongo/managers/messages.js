import messageModel from "../models/message.js";

export default class MessagesManager {
  // Obtener mensajes con los parámetros especificados
  getMessages = async (params) => {
    try {
      return await messageModel.find(params).lean();
    } catch (error) {
      return error;
    }
  };

  // Crear un nuevo mensaje
  createMessage = async (message) => {
    try {
      return await messageModel.create(message);
    } catch (error) {
      return error;
    }
  };
}
