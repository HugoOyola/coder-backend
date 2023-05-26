import { Router } from "express";
import ProductManager from "../dao/mongo/managers/products.js";
const routerV = Router();
const pm = new ProductManager();

routerV.get("/", async (req, res) => {
  try {
    const products = await pm.getProducts();

    res.render("home", { valueReturned: products });
  } catch (err) {
    console.log(err);
  }
});

routerV.use("/realTimeProducts", (req, res) => {
  res.render("realTimeProducts", {});
});

routerV.get("/chat", async (req, res) => {
  res.render("chat");
});

export default routerV;
