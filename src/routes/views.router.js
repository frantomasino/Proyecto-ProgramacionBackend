import express from 'express';
import path from 'path';
import fs from 'fs/promises';

const router = express.Router();

router.get('/home', async (req, res) => {
  try {
    const data = await fs.readFile(path.join(__dirname, '../data/products.json'), 'utf-8');
    const products = JSON.parse(data);
    res.render('home', { products });
  } catch (err) {
    res.status(500).send('Error reading products data.');
  }
});

export default router;
