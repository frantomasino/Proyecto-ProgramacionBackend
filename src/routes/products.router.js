import express from 'express';
import Product from '../models/Product.js';   

const router = express.Router();

// Ruta para obtener productos
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();  
        res.json(products);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ message: 'Error al obtener productos', error });
    }
});

// Ruta para agregar un producto
router.post('/', async (req, res) => {
    try {
        const { name, price, description } = req.body;

        if (!name || !price || !description) {
            return res.status(400).json({ message: 'Faltan campos obligatorios' });
        }

        const newProduct = new Product({ name, price, description });
        const savedProduct = await newProduct.save();  
        res.status(201).json(savedProduct);   
    } catch (error) {
        console.error('Error al agregar producto:', error);
        res.status(500).json({ message: 'Error al agregar producto', error });
    }
});

// Ruta para eliminar un producto
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.json({ message: 'Producto eliminado correctamente', deletedProduct });
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        res.status(500).json({ message: 'Error al eliminar producto', error });
    }
});

export default router;
