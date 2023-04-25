import { Router } from "express";
import { manager } from "../ProductManager/Manager.js";
import { Product } from "../ProductManager/ProductManager.js";

const router = Router();

// Obtener todos los productos
router.get("/", async (req, res) => {
  const data = await manager.getProducts();
  console.log(data);
  res.json(data);
});

// Obtener un producto por ID
router.get("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const item = await manager.getProductById(Number(pid));
    res.send(item);
  } catch (e) {
    console.error(e);
    res.status(500).send("Product not found");
  }
});

// Crear un nuevo producto
router.post("/", async (req, res) => {
  try {
    const { title, description, code, price, status, stock = 1, category, thumbnails } = req.body;

    // Verificar que todos los campos necesarios están presentes en el body
    if (!title || !description || !code || !price || !status || !category || !thumbnails) {
      console.error("Product definition incomplete");
      res.status(400).send();
      return;
    }

    const newProduct = new Product(title, description, price, category, thumbnails, code, stock, status);
    const newProductCreated = await manager.addProduct(newProduct);

    res.json(newProductCreated);
  } catch (e) {
    console.error(e);
    res.status(500).send("Error on create product, please check logs");
  }
});

// Actualizar un producto existente
router.put("/:pid", async (req, res) => {
  try {
    const pid = req.params.pid;
    const { title, description, code, price, status, stock, category, thumbnails } = req.body;

    // Verificar que se ha enviado el ID del producto a actualizar
    if (!pid) return res.status(400).send("Not send the pid");

    const updatedProduct = await manager.updateProduct(Number(pid), {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails,
    });
    res.json(updatedProduct);
  } catch (e) {
    console.error(e);
    const pid = req.params.pid;
    console.log(`Error on update product ${pid}`);
    res.status(500).send(null);
  }
});

// Eliminar un producto existente
router.delete("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const isDeleteProduct = await manager.deleteProduct(Number(pid));
    res.send(isDeleteProduct);
  } catch (e) {
    console.error(e);
    res.status(500).send("Error deleting product");
  }
});

export default router;
