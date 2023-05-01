// Importar la clase ProductManager del archivo ProductManager.js
import ProductManager from "./DAO/ProductManager.js";

// Crear una instancia de ProductManager
const pm = new ProductManager();

// Exportar una función socketProducts que recibe un objeto socketServer como parámetro
export default function socketProducts(socketServer) {
  // Añadir un listener para eventos de conexión en el socketServer
  socketServer.on("connection", async (socket) => {
    // Obtener los productos de la instancia de ProductManager
    const data = await pm.getProducts();
    // Emitir un evento "products" a través del socket con los productos obtenidos
    socket.emit("products", { data });

    // Añadir un listener para eventos "product" en el socket
    socket.on("product", async (data) => {
      try {
        // Agregar un producto a través de la instancia de ProductManager y obtener el valor de retorno
        const valueReturned = await pm.addProduct(data);

        // Emitir un evento "message" a través del socket con el valor de retorno obtenido
        socket.emit("message", valueReturned);
      } catch (err) {
        console.log(err);
      }
    });

    // Añadir un listener para eventos "delete" en el socket
    socket.on("delete", async (data) => {
      // Eliminar un producto a través de la instancia de ProductManager y obtener el resultado
      const result = await pm.deleteProduct(data);

      // Emitir un evento "delete" a través del socket con el resultado obtenido
      socket.emit("delete", result);
    });
  });
}
