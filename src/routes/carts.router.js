import express from 'express';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js'; 

const router = express.Router();

// Ruta para crear un carrito vacío
router.post('/', async (req, res) => {
    try {
        const newCart = new Cart({ products: [] });
        const savedCart = await newCart.save();
        res.status(201).json(savedCart);
    } catch (error) {
        console.error('Error al crear el carrito:', error);
        res.status(500).json({ message: 'Error al crear el carrito', error });
    }
});

// Ruta para añadir un producto a un carrito existente
router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;

        const cart = await Cart.findById(cid);
        if (!cart) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }

        const product = await Product.findById(pid);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        const existingProductIndex = cart.products.findIndex(p => p.product.toString() === pid);
        if (existingProductIndex !== -1) {
            cart.products[existingProductIndex].quantity += 1;
        } else {
            cart.products.push({ product: pid, quantity: 1 });
        }

        const updatedCart = await cart.save();
        res.status(200).json(updatedCart);
    } catch (error) {
        console.error('Error al añadir producto al carrito:', error);
        res.status(500).json({ message: 'Error al añadir producto al carrito', error });
    }
});

// Ruta para obtener el carrito por ID
router.get('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;

        const cart = await Cart.findById(cid).populate('products.product');
        if (!cart) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }

        res.status(200).json(cart);
    } catch (error) {
        console.error('Error al obtener el carrito:', error);
        res.status(500).json({ message: 'Error al obtener el carrito', error });
    }
});

// Ruta para eliminar un producto del carrito
router.delete('/:cid/product/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;

        const cart = await Cart.findById(cid);
        if (!cart) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }

        cart.products = cart.products.filter(p => p.product.toString() !== pid);

        const updatedCart = await cart.save();
        res.status(200).json(updatedCart);
    } catch (error) {
        console.error('Error al eliminar producto del carrito:', error);
        res.status(500).json({ message: 'Error al eliminar producto del carrito', error });
    }
});

// Ruta para limpiar productos del carrito
router.delete('/:cid/products', async (req, res) => {
    try {
        const { cid } = req.params;

        const cart = await Cart.findById(cid);
        if (!cart) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }

        cart.products = []; // Limpiar productos
        const updatedCart = await cart.save();

        res.status(200).json({ message: 'Productos eliminados del carrito', cart: updatedCart });
    } catch (error) {
        console.error('Error al limpiar productos del carrito:', error);
        res.status(500).json({ message: 'Error al limpiar productos del carrito', error });
    }
});

// Ruta para eliminar un carrito completo
router.delete('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;

        const deletedCart = await Cart.findByIdAndDelete(cid);
        if (!deletedCart) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }

        res.status(200).json({ message: 'Carrito eliminado' });
    } catch (error) {
        console.error('Error al eliminar el carrito:', error);
        res.status(500).json({ message: 'Error al eliminar el carrito', error });
    }
});

export default router;
