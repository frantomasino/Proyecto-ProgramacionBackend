import fs from 'fs/promises';

export default class ProductManager {
    constructor(filePath) {
        this.filePath = filePath;
    }

    async getProducts() {
        try {
            const data = await fs.readFile(this.filePath, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Error reading products file:', error);
            return [];
        }
    }

    async addProduct(product) {
        try {
            const products = await this.getProducts();
            product.id = products.length ? Math.max(products.map(p => p.id)) + 1 : 1;
            products.push(product);
            await fs.writeFile(this.filePath, JSON.stringify(products, null, 2));
            return product;
        } catch (error) {
            console.error('Error adding product:', error);
        }
    }

    async deleteProduct(id) {
        try {
            const products = await this.getProducts();
            const updatedProducts = products.filter(product => product.id !== id);
            await fs.writeFile(this.filePath, JSON.stringify(updatedProducts, null, 2));
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    }
}
