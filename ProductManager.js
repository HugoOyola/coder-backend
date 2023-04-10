const fs = require('fs');

class ProductManager {
  constructor(filePath) {
    this.filePath = filePath;
    this.products = [];
    this.productId = 1;
    this.readProductsFromFile();
  }

  readProductsFromFile() {
    try {
      const data = fs.readFileSync(this.filePath);
      this.products = JSON.parse(data);
      this.productId = this.products.length + 1;
    } catch (err) {
      console.error(`Error al leer el archivo ${this.filePath}: ${err}`);
    }
  }

  saveProductsToFile() {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(this.products));
    } catch (err) {
      console.error(`Error al escribir el archivo ${this.filePath}: ${err}`);
    }
  }

  addProduct(product) {
    if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
      console.log('Todos los campos son requeridos');
      return;
    }
    if (this.getProductByCode(product.code)) {
      console.log('El código del producto ya existe');
      return;
    }
    product.id = this.productId++;
    this.products.push(product);
    this.saveProductsToFile();
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      console.log('No se ha encontrado el Producto');
    }
    return product;
  }

  getProductByCode(code) {
    return this.products.find((p) => p.code === code);
  }

  updateProduct(id, productData) {
    const productIndex = this.products.findIndex((p) => p.id === id);
    if (productIndex === -1) {
      console.log('No se ha encontrado el Producto');
      return;
    }
    const product = { ...this.products[productIndex], ...productData };
    this.products[productIndex] = product;
    this.saveProductsToFile();
  }

  deleteProduct(id) {
    const productIndex = this.products.findIndex((p) => p.id === id);
    if (productIndex === -1) {
      console.log('No se ha encontrado el Producto');
      return;
    }
    this.products.splice(productIndex, 1);
    this.saveProductsToFile();
  }
}

const productManager = new ProductManager('products.json');

productManager.addProduct({
  title: 'iPhone',
  description: 'iPhone 14 Pro',
  price: 999,
  thumbnail: 'iphone.png',
  code: 'APPLE001',
  stock: 25,
});

productManager.addProduct({
  title: 'Samsung Galaxy',
  description: 'Samsung Galaxy Note',
  price: 899,
  thumbnail: 'samsung.png',
  code: 'SAMSUNG001',
  stock: 15,
});

const products = productManager.getProducts();
console.log(products);

const productById = productManager.getProductById(2);
console.log(productById);

const productByCode = productManager.getProductByCode('APPLE001');
console.log(productByCode);

productManager.updateProduct(1, { stock: 30 });
console.log(productManager.getProducts());

productManager.deleteProduct(2);
console.log(productManager.getProducts());
