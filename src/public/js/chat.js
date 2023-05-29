// Creación de una instancia de Socket.IO con autoConnect desactivado
const socket = io({
  autoConnect: false,
});

// Obtención del elemento del chat en el DOM
const chatBox = document.getElementById("chatBox");

let user;

// Diálogo para solicitar al usuario que ingrese su nombre de usuario
Swal.fire({
  title: "Identifícate",
  text: "Para acceder al chat, coloca tu nombre de usuario:",
  icon: "question",
  input: "text",
  inputValidator: (value) => {
    return !value && "¡Necesitas identificarte antes de entrar!";
  },
  allowOutsideClick: false,
  allowEscapeKey: false,
}).then((result) => {
  user = result.value;
  // Conexión al socket después de que el usuario ingresa su nombre de usuario
  socket.connect();
  // Emitir un evento 'chat:newParticipant' con el nombre de usuario al servidor
  socket.emit("chat:newParticipant", user);
});

// Manejador de eventos para la pulsación de tecla en el chatBox
chatBox.addEventListener("keyup", (evt) => {
  if (evt.key === "Enter") {
    if (chatBox.value.trim().length > 0) {
      // Emitir un evento 'chat:message' con el nombre de usuario y el mensaje al servidor
      socket.emit("chat:message", { user, message: chatBox.value.trim() });
      chatBox.value = "";
    }
  }
});

// Manejador de eventos para recibir los registros de mensajes del servidor
socket.on("chat:messageLogs", (data) => {
  const logs = document.getElementById("logs");
  let message = "";
  data.forEach((log) => {
    message += `${log.user} dice: ${log.message} <br/>`;
  });
  logs.innerHTML = message;
});

// Manejador de eventos para recibir notificaciones de nuevas conexiones al chat
socket.on("chat:newConnection", (data) => {
  Swal.fire({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    title: `${data} se unió al chat`,
    icon: "success",
  });
});
