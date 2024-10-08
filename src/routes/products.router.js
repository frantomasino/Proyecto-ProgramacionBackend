import express from 'express';
import Product from '../models/Product.js';   

const router = express.Router();

// Ruta para obtener productos
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();  
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener productos' });
    }
});

 router.post('/', async (req, res) => {
    try {
        const { name, price, description } = req.body;
        const newProduct = new Product({ name, price, description });
        const savedProduct = await newProduct.save();  // Guardando el producto en MongoDB
        res.status(201).json(savedProduct);   
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar producto' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id); // Elimina el producto de MongoDB
        if (deletedProduct) {
            res.json({ message: 'Producto eliminado correctamente', deletedProduct });
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar producto' });
    }
});

export default router;
