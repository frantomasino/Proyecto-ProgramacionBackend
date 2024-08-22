import fs from 'fs/promises';

class ProductManager {
    constructor(filePath) {
        this.filePath = filePath;
    }

    async getProducts() {
        try {
            const data = await fs.readFile(this.filePath, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    async getProductById(id) {
        const products = await this.getProducts();
        return products.find(p => p.id === id);
    }

    async addProduct(product) {
        const products = await this.getProducts();
        const newProduct = { id: products.length + 1, ...product };
        products.push(newProduct);
        await this.saveProducts(products);
        return newProduct;
    }

    async updateProduct(id, updatedFields) {
        const products = await this.getProducts();
        const productIndex = products.findIndex(p => p.id === id);
        if (productIndex === -1) {
            return null;
        }
        products[productIndex] = { ...products[productIndex], ...updatedFields };
        await this.saveProducts(products);
        return products[productIndex];
    }

    async deleteProduct(id) {
        let products = await this.getProducts();
        const productIndex = products.findIndex(p => p.id === id);
        if (productIndex === -1) {
            return null;
        }
        products = products.filter(p => p.id !== id);
        await this.saveProducts(products);
        return true;
    }

    async saveProducts(products) {
        await fs.writeFile(this.filePath, JSON.stringify(products, null, 2));
    }
}

export default ProductManager;
