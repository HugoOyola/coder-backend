import ProductManager from "../DAO/mongo/managers/products.js";

// Crear una instancia de ProductManager
const pm = new ProductManager();

// Función para el manejo de productos a través de sockets
export default function socketProducts(socketServer) {
  // Evento de conexión
  socketServer.on('connection', async (socket) => {
    // Obtener los productos disponibles
    const products = await pm.getProducts();
    // Emitir los productos al cliente conectado
    socket.emit('products', { products });

    // Evento para agregar un producto
    socket.on('product', async (data) => {
      try {
        // Extraer propiedades del producto del objeto de datos
        const {
          title,
          description,
          price,
          code,
          stock,
          status,
          category,
          thumbnails
        } = data;

        // Verificar si todas las propiedades del producto están presentes
        const checkProduct = Object.values({
          title,
          description,
          price,
          code,
          stock,
          status,
          category,
          thumbnails
        }).every((property) => property);

        if (!checkProduct) {
          // Emitir un mensaje de error si faltan propiedades del producto
          return socket.emit('message', { status: 'error', message: "The product doesn't have all the properties" });
        }

        // Verificar el tipo de cada propiedad del producto
        if (
          !(typeof title === 'string' &&
          typeof description === 'string' &&
          typeof price === 'number' &&
          typeof code === 'string' &&
          typeof stock === 'number' &&
          typeof status === 'boolean' &&
          typeof category === 'string' &&
          Array.isArray(thumbnails))
        ) {
          // Emitir un mensaje de error si algún tipo de propiedad no es válido
          return socket.emit('message', { status: 'error', message: 'Type of property is not valid' });
        }

        if (data.price < 0 || data.stock < 0) {
          // Emitir un mensaje de error si el precio o el stock son menores o iguales a cero
          return socket.emit('message', { status: 'error', message: 'Product or stock cannot have values less than or equal to zero' });
        }

        // Agregar el producto a través del ProductManager
        const result = await pm.addProduct(data);

        // Obtener los productos actualizados después de agregar el nuevo producto
        const products = await pm.getProducts();

        // Emitir un mensaje de éxito y los productos actualizados al cliente
        socket.emit('message', { status: 'success', message: `The product ${result.title} was added` });
        return socket.emit('products', { products });
      } catch (err) {
        console.log(err);
      }
    });

    // Evento para eliminar un producto
    socket.on('delete', async (data) => {
      await pm.deleteProduct(data); // Eliminar el producto a través del ProductManager
      const products = await pm.getProducts(); // Obtener los productos actualizados después de eliminar el producto
      socket.emit('products', { products }); // Emitir los productos actualizados al cliente
    });
  });
}
