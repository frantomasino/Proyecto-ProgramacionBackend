import Product from '../models/Product.js';

class ProductRepository {
  static async createProduct(data) {
    const newProduct = new Product(data);
    return await newProduct.save();
  }

  static async getAllProducts() {
    return await Product.find();
  }

  static async getProductById(id) {
    return await Product.findById(id);
  }

  static async updateProduct(id, data) {
    return await Product.findByIdAndUpdate(id, data, { new: true });
  }

  static async deleteProduct(id) {
    return await Product.findByIdAndDelete(id);
  }
}

export default ProductRepository;
 