import Product from '../models/Product.js';

class ProductManager {
    async getProducts() {
        try {
            const products = await Product.find();
            return products;
        } catch (error) {
            throw new Error('Error fetching products: ' + error);
        }
    }

    async addProduct(productData) {
        try {
            const newProduct = new Product(productData);
            await newProduct.save();
        } catch (error) {
            throw new Error('Error adding product: ' + error);
        }
    }

    async deleteProduct(id) {
        try {
            await Product.findByIdAndDelete(id);
        } catch (error) {
            throw new Error('Error deleting product: ' + error);
        }
    }
}

export default ProductManager;
