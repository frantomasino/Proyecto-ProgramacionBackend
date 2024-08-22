import express from 'express';
import ProductManager from '../services/ProductManager.js';
import path from 'path';

const router = express.Router();
const filePath = path.join(process.cwd(), 'data', 'products.json');
const productManager = new ProductManager(filePath);


router.get('/', async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener productos' });
    }
});


router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const product = await productManager.getProductById(Number(id));
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el producto' });
    }
});


router.post('/', async (req, res) => {
    const productData = req.body;
    try {
        const newProduct = await productManager.addProduct(productData);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el producto' });
    }
});

 
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updatedFields = req.body;
    try {
        const updatedProduct = await productManager.updateProduct(Number(id), updatedFields);
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el producto' });
    }
});

 
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await productManager.deleteProduct(Number(id));
        if (!deleted) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el producto' });
    }
});

export default router;
