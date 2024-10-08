 import fs from 'fs';
import path from 'path';

 const cartsFilePath = path.resolve('data', 'carts.json');

class CartManager {
    async createCart() {
        const carts = await this.getCarts();
        const newCart = { id: carts.length + 1, products: [] };
        carts.push(newCart);
        await fs.promises.writeFile(cartsFilePath, JSON.stringify(carts, null, 2));
        return newCart;
     }

    async getCarts() {
        try {
            const data = await fs.promises.readFile(cartsFilePath, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }
 }

 export default CartManager;
