// Importamos Router y ProductManager desde sus respectivos archivos
import { Router } from "express";
import ProductManager from "../DAO/ProductManager.js";

// Creamos una instancia de Router y ProductManager
const router = Router();
const pm = new ProductManager();

// Ruta para obtener todos los productos y renderizarlos en la vista "home"
router.get('/', async (req, res) => {
    try {
        const products = await pm.getProducts(); // Obtenemos los productos desde ProductManager
        console.log(products);
        res.render("home", { valueReturned: products }); // Renderizamos la vista "home" con los productos obtenidos
    }
    catch (err) {
        console.log(err);
        res.status(500).send({err}); // Enviamos una respuesta de error en caso de que ocurra una excepción
    }
});

// Ruta para renderizar la vista "realTimeProducts"
router.use('/realTimeProducts', (req, res) => {
    res.render('realTimeProducts', {}); // Renderizamos la vista "realTimeProducts"
});

// Exportamos el router
export default router;
