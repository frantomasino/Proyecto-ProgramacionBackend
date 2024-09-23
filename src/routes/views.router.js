import { Router } from 'express';
import ProductManager from '../services/ProductManager.js';

const router = Router();
const productManager = new ProductManager();

router.get('/products', async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.render('home', { products });
    } catch (error) {
        console.error('Error rendering products:', error);
        res.status(500).send('Error rendering products');
    }
});

export default router;
