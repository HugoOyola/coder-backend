import express from 'express';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import socketProducts from './listeners/socketProducts.js';
import registerChatHandler from './listeners/chatHandlers.js';
import session from 'express-session'
import cookieParser from 'cookie-parser'
import mongoStore from 'connect-mongo'

import routerP from './routes/products.router.js';
import routerC from './routes/carts.router.js';
import routerV from './routes/views.router.js';
import routerS from './routes/session.router.js';

import __dirname from './utils.js';
import connectToDB from './config/configServer.js';

const app = express();
const PORT = process.env.PORT || 8080

app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');



connectToDB()

app.use(session({
    store: mongoStore.create({
        ttl:100000*60,
        mongoUrl:'mongodb+srv://hugo29h:eN8xNDCYsEwjkaDL@e-commerce.vh8g3ls.mongodb.net/ecommerce?retryWrites=true&w=majority',
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    }),
    secret: 'HugoCoderBackEnd',
    resave: false,
    saveUninitialized: false
}))

app.use('/api/products', routerP)
app.use('/api/carts', routerC)
app.use('/api/session', routerS)
app.use('/', routerV);

const httpServer = app.listen(PORT, () => {
    try {
        console.log(`Listening to the port ${PORT}\nAcceder a:`);
        console.log(`\thttp://localhost:${PORT}/products`)
    }
    catch (err) {
        console.log(err);
    }
});

const io = new Server(httpServer)

socketProducts(io)

io.on('connection',socket=>{
    registerChatHandler(io,socket);
})