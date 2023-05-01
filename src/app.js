// Importación de paquetes y archivos necesarios
import express from 'express';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';

import __dirname from './utils.js';

import routerProducts from './routes/products.router.js';
import routerCarts from './routes/carts.router.js';
import routerViews from './routes/views.router.js';
import socketProducts from './socketProducts.js';

// Creación de la instancia de la aplicación Express
const app = express();
const PORT = 8080

// Configuración de la aplicación Express
app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración del motor de plantillas Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

// Configuración de las rutas
app.use('/api/products', routerProducts)
app.use('/api/carts', routerCarts)
app.use('/', routerViews);

// Inicio del servidor Express
const server = app.listen(PORT, () => {
    try {
        console.log(`Listening to the port ${PORT}`);
    }
    catch (err) {
        console.log(err);
    }
});

// Creación del servidor de sockets y configuración de los eventos
const socketServer = new Server(server)
socketProducts(socketServer)
