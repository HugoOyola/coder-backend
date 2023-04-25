import { Router } from "express";
import { managerCart } from "../ProductManager/Manager.js";

const routerCart = Router();

routerCart.post("/", async (req, res) => {
  const newCart = { products: [] };
  const createdCart = await managerCart.createCart(newCart);
  console.log(createdCart);
  res.status(201).json(createdCart); // utiliza el estado de respuesta 201 y el método json para enviar la respuesta
});

routerCart.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  const myCart = await managerCart.getCartById(Number(cid)); // corrige el nombre del método y la variable
  if (!myCart) return res.status(404).send("Cart not found"); // utiliza el estado de respuesta 404 si el carrito no se encuentra
  return res.json(myCart);
});

routerCart.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  if (!pid || !cid) return res.status(400).send("Id not provided"); // utiliza el estado de respuesta 400 para indicar una solicitud incorrecta

  const updatedCart = await managerCart.addProductToCart(Number(cid), Number(pid));
  if (!updatedCart) return res.status(404).send("Cart or product not found"); // utiliza el estado de respuesta 404 si el carrito o el producto no se encuentran
  return res.json(updatedCart);
});

export default routerCart;
