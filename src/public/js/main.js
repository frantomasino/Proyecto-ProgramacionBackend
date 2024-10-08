import express from 'express';
import { engine } from 'express-handlebars';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import path from 'path';
import { fileURLToPath } from 'url';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import './database.js';  
import Product from './models/Product.js';  

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server);

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

// Ruta para mostrar los productos en la vista 'home'
app.get('/home', async (req, res) => {
    try {
        const products = await Product.find(); // Obtiene los productos desde MongoDB
        res.render('home', { products });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send('Error fetching products');
    }
});

// Ruta para la vista de productos en tiempo real
app.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts');
});

io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');

    // Enviar productos cuando se soliciten
    socket.on('requestProducts', async () => {
        try {
            const products = await Product.find(); // Obtener productos desde MongoDB
            socket.emit('updateProducts', products);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    });

    // Agregar un nuevo producto y actualizar la lista de productos en tiempo real
    socket.on('addProduct', async (productData) => {
        try {
            const newProduct = new Product(productData);
            await newProduct.save(); // Guardar producto en MongoDB
            const updatedProducts = await Product.find();
            io.emit('updateProducts', updatedProducts);
        } catch (error) {
            console.error('Error adding product:', error);
        }
    });

    // Eliminar un producto y actualizar la lista de productos en tiempo real
    socket.on('deleteProduct', async (id) => {
        try {
            await Product.findByIdAndDelete(id); // Eliminar producto desde MongoDB
            const updatedProducts = await Product.find();
            io.emit('updateProducts', updatedProducts);
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
