import ProductManager, { Product } from './ProductManager.js'; // importa el módulo ProductManager
import CartManager from '../cartManager/CartManager.js'; // importa el módulo CartManager

// -------------------------------------------------
// INICIALIZA EL CART MANAGER Y CREA EL ARCHIVO carts.json
const managerCart = new CartManager(); // crea una instancia de CartManager
await managerCart.initialize(); // inicializa el managerCart y crea el archivo carts.json

// -------------------------------------------------
// INICIALIZA EL MANAGER Y CREA EL ARCHIVO products.json
const manager = new ProductManager(); // crea una instancia de ProductManager
await manager.initialize(); // inicializa el manager y crea el archivo products.json

// AGREGA ARTÍCULOS TECNOLÓGICOS
const product_1 = new Product("Laptop", "Powerful laptop for work and gaming", 1000, "Technology", "https://picsum.photos/id/1001/300", 1233, 20);
await manager.addProduct(product_1);

const product_2 = new Product("Smartphone", "High-end smartphone with top-of-the-line features", 800, "Technology", "https://picsum.photos/id/1002/300", 1234, 15);
await manager.addProduct(product_2);

const product_3 = new Product("Tablet", "Sleek tablet for entertainment and productivity", 500, "Technology", "https://picsum.photos/id/1003/300", 1235, 10);
await manager.addProduct(product_3);

const product_4 = new Product("Smart Speaker", "Voice-activated speaker with built-in digital assistant", 150, "Technology", "https://picsum.photos/id/1004/300", 1236, 25);
await manager.addProduct(product_4);

const product_5 = new Product("Wireless Earbuds", "Bluetooth earbuds with noise-cancelling technology", 100, "Technology", "https://picsum.photos/id/1005/300", 1237, 30);
await manager.addProduct(product_5);

const product_6 = new Product("Gaming Console", "Next-generation gaming console with 4K resolution", 500, "Technology", "https://picsum.photos/id/1006/300", 1238, 10);
await manager.addProduct(product_6);

const product_7 = new Product("Smart TV", "Large-screen television with built-in streaming services", 800, "Technology", "https://picsum.photos/id/1007/300", 1239, 5);
await manager.addProduct(product_7);

const product_8 = new Product("Drone", "Quadcopter drone with HD camera", 300, "Technology", "https://picsum.photos/id/1008/300", 1240, 10);
await manager.addProduct(product_8);

const product_9 = new Product("Fitness Tracker", "Activity tracker with heart rate monitoring and GPS", 80, "Technology", "https://picsum.photos/id/1009/300", 1241, 20);
await manager.addProduct(product_9);

const product_10 = new Product("Portable Charger", "Compact power bank for charging on-the-go", 50, "Technology", "https://picsum.photos/id/1010/300", 1242, 30);
await manager.addProduct(product_10);

// CREA CUATRO CARRITOS VACÍOS
await managerCart.createCart({ products: [] });
await managerCart.createCart({ products: [] });
await managerCart.createCart({ products: [] });
await managerCart.createCart({ products: [] });

// OBTIENE TODOS LOS ARTÍCULOS
console.log('Ttodos los productos');
console.log(await manager.getProducts());

// OBTIENE UN ARTÍCULO POR SU ID
console.log('Productos por ID');
console.log(await manager.getProductById(2));

// OBTIENE LOS PRODUCTOS DEL CACHÉ DE MEMORIA
console.log('Productos que estan en la caché de memoria');
console.log(manager.products);

// EXPORTA LOS MANAGERS DE PRODUCTOS Y CARRITOS
export {
    manager,
    managerCart
}

// EXPORTA UN VALOR NULO
export default null;
