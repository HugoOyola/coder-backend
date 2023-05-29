import MessagesManager from "../dao/mongo/managers/messages.js";

// Creación de una instancia de MessagesManager
const messagesService = new MessagesManager();

// Función para registrar el controlador del chat
const registerChatHandler = (io, socket) => {
  // Función para guardar un nuevo mensaje
  const saveMessage = async (message) => {
    await messagesService.createMessage(message);
    const messageLogs = await messagesService.getMessages();
    io.emit("chat:messageLogs", messageLogs);
  };

  // Función para notificar una nueva conexión/participante
  const newParticipant = (user) => {
    socket.broadcast.emit("chat:newConnection");
  };

  // Escucha del evento 'chat:message' para guardar un nuevo mensaje
  socket.on("chat:message", saveMessage);

  // Escucha del evento 'chat:newParticipant' para notificar una nueva conexión/participante
  socket.on("chat:newParticipant", newParticipant);
};

export default registerChatHandler;
