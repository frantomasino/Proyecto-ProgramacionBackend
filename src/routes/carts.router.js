import express from 'express';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js'; 

const router = express.Router();

// Ruta para crear un carrito vacío
router.post('/', async (req, res) => {
    try {
        const newCart = new Cart({ products: [] });  // Crear un carrito vacío
        const savedCart = await newCart.save();  // Guardar el carrito en MongoDB
        res.status(201).json(savedCart);  // Devolver el carrito creado
    } catch (error) {
        console.error('Error al crear el carrito:', error);
        res.status(500).json({ message: 'Error al crear el carrito', error });
    }
});

// Ruta para añadir un producto a un carrito existente
router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;

        // Buscar el carrito por su ID
        const cart = await Cart.findById(cid);
        if (!cart) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }

        // Buscar el producto por su ID
        const product = await Product.findById(pid);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        // Verificar si el producto ya está en el carrito
        const existingProductIndex = cart.products.findIndex(p => p.product.toString() === pid);
        if (existingProductIndex !== -1) {
            // Si ya está, incrementar la cantidad
            cart.products[existingProductIndex].quantity += 1;
        } else {
            // Si no está, agregar el producto con una cantidad inicial de 1
            cart.products.push({ product: pid, quantity: 1 });
        }

        // Guardar el carrito actualizado
        const updatedCart = await cart.save();

        // Responder con el carrito actualizado
        res.status(200).json(updatedCart);
    } catch (error) {
        console.error('Error al añadir producto al carrito:', error);
        res.status(500).json({ message: 'Error al añadir producto al carrito', error });
    }
});

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

// Ruta para eliminar un carrito completo
router.delete('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;

         await Cart.findByIdAndDelete(cid);
        res.status(200).json({ message: 'Carrito eliminado' });
    } catch (error) {
        console.error('Error al eliminar el carrito:', error);
        res.status(500).json({ message: 'Error al eliminar el carrito', error });
    }
});

export default router;
