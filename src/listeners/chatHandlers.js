import MessagesManager from "../DAO/mongo/managers/messages.js";

// Instanciar el servicio de administración de mensajes
const messagesService = new MessagesManager();

// Manejador para el registro de chat
const registerChatHandler = (io, socket) => {
  // Función para guardar un nuevo mensaje en la base de datos
  const saveMessage = async (message) => {
    await messagesService.createMessage(message);
    const messageLogs = await messagesService.getMessages();
    io.emit("chat:messageLogs", messageLogs);
  };

  // Función para notificar a los demás participantes de una nueva conexión
  const newParticipant = (user) => {
    socket.broadcast.emit("chat:newConnection");
  };

  // Eventos para escuchar los mensajes y nuevos participantes
  socket.on("chat:message", saveMessage);
  socket.on("chat:newParticipant", newParticipant);
};

export default registerChatHandler;
