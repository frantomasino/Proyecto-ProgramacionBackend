const express = require('express');
const ProductManager = require('../services/ProductManager');
const router = express.Router();

const productManager = new ProductManager('./data/productos.json');

 router.get('/', async (req, res) => {
    try {
        const limit = req.query.limit;
        const products = await productManager.getProducts();
        if (limit) {
            return res.json(products.slice(0, limit));
        }
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

 router.get('/:pid', async (req, res) => {
    const { pid } = req.params;
    try {
        const product = await productManager.getProductById(pid);
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
});

 router.post('/', async (req, res) => {
    try {
        const newProduct = await productManager.addProduct(req.body);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el producto' });
    }
});

 router.put('/:pid', async (req, res) => {
    const { pid } = req.params;
    try {
        const updatedProduct = await productManager.updateProduct(pid, req.body);
        if (!updatedProduct) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el producto' });
    }
});

 router.delete('/:pid', async (req, res) => {
    const { pid } = req.params;
    try {
        const deletedProduct = await productManager.deleteProduct(pid);
        if (!deletedProduct) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json({ message: 'Producto eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el producto' });
    }
});

module.exports = router;
