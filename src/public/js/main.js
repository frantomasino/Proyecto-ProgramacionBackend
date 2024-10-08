import express from 'express';
import { engine } from 'express-handlebars';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import path from 'path';
import { fileURLToPath } from 'url';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import ProductManager from './services/ProductManager.js';
import './database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server);

const productManager = new ProductManager(path.join(__dirname, 'data', 'products.json'));

app.engine('handlebars', engine({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.get('/', (req, res) => {
    res.send('Bienvenido');
});

app.get('/home', async (req, res) => {
    try {
        const products = await productManager.getProducts(); 
        res.render('home', { products });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send('Error fetching products');
    }
});

app.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts');
});

io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');

    socket.on('requestProducts', async () => {
        try {
            const products = await productManager.getProducts();
            socket.emit('updateProducts', products);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    });

    socket.on('addProduct', async (product) => {
        try {
            await productManager.addProduct(product);
            io.emit('updateProducts', await productManager.getProducts());
        } catch (error) {
            console.error('Error adding product:', error);
        }
    });

    socket.on('deleteProduct', async (id) => {
        try {
            await productManager.deleteProduct(id);
            const products = await productManager.getProducts();
            io.emit('updateProducts', products);
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
