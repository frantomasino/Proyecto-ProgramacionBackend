import { Router } from 'express';
import ProductManager from '../services/ProductManager.js';
import { Server as IOServer } from 'socket.io';

const router = Router();
const productManager = new ProductManager();
let io;

router.setSocketServer = function(server) {
    io = new IOServer(server);

    io.on('connection', (socket) => {
        console.log('New WebSocket connection');

        productManager.getProducts().then(products => {
            socket.emit('updateProducts', products);
        });

        socket.on('addProduct', async (productData) => {
            await productManager.addProduct(productData);
            const products = await productManager.getProducts();
            io.emit('updateProducts', products);
        });

        socket.on('deleteProduct', async (productId) => {
            await productManager.deleteProduct(productId);
            const products = await productManager.getProducts();
            io.emit('updateProducts', products);
        });
    });
};

export default router;
