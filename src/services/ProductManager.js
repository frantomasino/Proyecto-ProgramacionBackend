import fs from 'fs/promises';
import path from 'path';

class ProductManager {
    constructor(filePath) {
        this.filePath = filePath;
    }

    async getProducts() {
        try {
            const data = await fs.readFile(this.filePath, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Error reading products:', error);
            throw error;
        }
    }

    
    async addProduct(product) {
        try {
            const products = await this.getProducts();
            product.id = products.length > 0 ? products[products.length - 1].id + 1 : 1; 
            products.push(product);
            await fs.writeFile(this.filePath, JSON.stringify(products, null, 2));
            return product;
        } catch (error) {
            console.error('Error adding product:', error);
            throw error;
        }
    }

    
    async deleteProduct(id) {
        try {
            let products = await this.getProducts();
            products = products.filter(product => product.id !== id);
            await fs.writeFile(this.filePath, JSON.stringify(products, null, 2));
        } catch (error) {
            console.error('Error deleting product:', error);
            throw error;
        }
    }
}

export default ProductManager;
