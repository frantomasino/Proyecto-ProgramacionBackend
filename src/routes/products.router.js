import express from 'express';
import fs from 'fs/promises';
import path from 'path';

const router = express.Router();
const filePath = path.join(process.cwd(), 'data', 'products.json');

 router.get('/', async (req, res) => {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        const products = JSON.parse(data);
        res.json(products);
    } catch (error) {
        console.error('Error al leer los productos:', error);
        res.status(500).json({ message: 'Error al obtener productos' });
    }
});

export default router;
