import { Router } from 'express';
import CartManager from '../services/CartManager.js';

const router = Router();
const cartManager = new CartManager();

router.post('/', async (req, res) => {
    try {
        const newCart = await cartManager.createCart();
        res.status(201).json(newCart);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear carrito' });
    }
});


router.get('/:cid', async (req, res) => {
    try {
        const cart = await cartManager.getCartById(req.params.cid);
        if (!cart) {
            return res.status(404).json({ error: 'Carrito no encontrado' });
        }
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener carrito' });
    }
});

router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const updatedCart = await cartManager.addProductToCart(req.params.cid, req.params.pid, req.body.quantity || 1);
        res.json(updatedCart);
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar producto al carrito' });
    }
});

router.delete('/:cid/products/:pid', async (req, res) => {
    try {
        const updatedCart = await cartManager.removeProductFromCart(req.params.cid, req.params.pid);
        res.json(updatedCart);
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar producto del carrito' });
    }
});

router.put('/:cid', async (req, res) => {
    try {
        const updatedCart = await cartManager.updateCart(req.params.cid, req.body.products);
        res.json(updatedCart);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar carrito' });
    }
});

router.put('/:cid/products/:pid', async (req, res) => {
    try {
        const updatedCart = await cartManager.updateProductQuantity(req.params.cid, req.params.pid, req.body.quantity);
        if (!updatedCart) {
            return res.status(404).json({ error: 'Producto no encontrado en el carrito' });
        }
        res.json(updatedCart);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar cantidad de producto' });
    }
});

router.delete('/:cid', async (req, res) => {
    try {
        const cart = await cartManager.clearCart(req.params.cid);
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: 'Error al vaciar carrito' });
    }
});

export default router;
