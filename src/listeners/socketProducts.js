import ProductManager from "../dao/mongo/managers/products.js";

// Creación de una instancia de ProductManager
const pm = new ProductManager();

// Función para manejar la comunicación de productos a través de sockets
export default function socketProducts(socketServer) {
  socketServer.on("connection", async (socket) => {
    // Obtener la lista de productos al establecer la conexión
    const products = await pm.getProducts();

    // Emitir los productos al cliente conectado
    socket.emit("products", { products });

    socket.on("product", async (data) => {
      try {
        // Extraer las propiedades del producto de los datos recibidos
        const { title, description, price, code, stock, status, category, thumbnails } = data;

        // Verificar que el producto tenga todas las propiedades requeridas
        const checkProduct = Object.values({
          title,
          description,
          price,
          code,
          stock,
          status,
          category,
          thumbnails,
        }).every((property) => property);

        if (!checkProduct) {
          return socket.emit("message", { status: "error", message: "The product doesn't have all the properties" });
        }

        // Verificar los tipos de datos de las propiedades del producto
        if (
          !(
            typeof title === "string" &&
            typeof description === "string" &&
            typeof price === "number" &&
            typeof code === "string" &&
            typeof stock === "number" &&
            typeof status === "boolean" &&
            typeof category === "string" &&
            Array.isArray(thumbnails)
          )
        ) {
          return socket.emit("message", { status: "error", message: "Type of property is not valid" });
        }

        // Verificar que el precio y el stock no sean valores negativos
        if (data.price < 0 || data.stock < 0) {
          return socket.emit("message", { status: "error", message: "Price or stock cannot be values less than or equal to zero" });
        }

        // Agregar el producto a la base de datos
        const result = await pm.addProduct(data);

        // Obtener la lista actualizada de productos
        const products = await pm.getProducts();

        // Emitir un mensaje de éxito y la lista de productos actualizada al cliente
        socket.emit("message", { status: "success", message: `The product ${result.title} was added` });
        return socket.emit("products", { products });
      } catch (err) {
        console.log(err);
      }
    });

    socket.on("delete", async (data) => {
      // Eliminar el producto de la base de datos
      await pm.deleteProduct(data);

      // Obtener la lista actualizada de productos
      const products = await pm.getProducts();

      // Emitir la lista de productos actualizada al cliente
      socket.emit("products", { products });
    });
  });
}
