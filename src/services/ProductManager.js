import Product from '../models/Product.js';

class ProductManager {
    async getProducts() {
        try {
            const products = await Product.find();
            return products;
        } catch (error) {
            throw new Error('Error al obtener productos: ' + error.message);
        }
    }

    async addProduct(productData) {
        try {
            const newProduct = new Product(productData);
            await newProduct.save();
        } catch (error) {
            throw new Error('Error al agregar producto: ' + error.message);
        }
    }

    async deleteProduct(id) {
        try {
            const deletedProduct = await Product.findByIdAndDelete(id);
            if (!deletedProduct) {
                throw new Error('Producto no encontrado');
            }
        } catch (error) {
            throw new Error('Error al eliminar producto: ' + error.message);
        }
    }
}

export default ProductManager;
