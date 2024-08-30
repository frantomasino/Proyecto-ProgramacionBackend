import express from 'express';
import ProductManager from '../services/ProductManager.js';
import path from 'path';
import { Server as IOServer } from 'socket.io';

const router = express.Router();
const filePath = path.join(process.cwd(), 'data', 'products.json');
const productManager = new ProductManager(filePath);
const io = new IOServer(); 


io.on('connection', (socket) => {
    console.log('New WebSocket connection');

    productManager.getProducts().then(products => {
        socket.emit('updateProducts', products);
    });

    socket.on('addProduct', async (product) => {
        try {
            await productManager.addProduct(product);
            const products = await productManager.getProducts();
            io.emit('updateProducts', products);
        } catch (error) {
            console.error('Error adding product:', error);
        }
    });

    socket.on('requestProducts', async () => {
        try {
            const products = await productManager.getProducts();
            socket.emit('updateProducts', products);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    });
});

export default router;
