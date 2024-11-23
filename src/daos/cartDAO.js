
import CartModel from '../models/Cart.js';

class CartDAO {
    /**
     * Obtener un carrito por su ID.
     * @param {string} id - ID del carrito.
     * @returns {Object} - Carrito encontrado o null.
     */
    async getCartById(id) {
        try {
            return await CartModel.findById(id).populate('products.productId');
        } catch (error) {
            console.error('Error al obtener el carrito:', error);
            throw error;
        }
    }

    /**
     * Agregar un producto al carrito.
     * @param {string} cartId - ID del carrito.
     * @param {string} productId - ID del producto.
     * @param {number} quantity - Cantidad del producto.
     * @returns {Object} - Carrito actualizado.
     */


    
    async addProduct(cartId, productId, quantity) {
        try {
            const cart = await CartModel.findById(cartId);
            if (!cart) throw new Error('Carrito no encontrado.');

            const productIndex = cart.products.findIndex(
                item => item.productId.toString() === productId
            );

            if (productIndex >= 0) {
            cart.products[productIndex].quantity += quantity;
            } else {
                cart.products.push({ productId, quantity });
            }

            return await cart.save();
        } catch (error) {
            console.error('Error al agregar producto al carrito:', error);
            throw error;
        }
    }

    /**
     * Actualizar un carrito.
     * @param {string} cartId - ID del carrito.
     * @param {Object} updateData - Datos para actualizar.
     * @returns {Object} - Carrito actualizado.
     */
    async updateCart(cartId, updateData) {
        try {
            return await CartModel.findByIdAndUpdate(cartId, updateData, { new: true });
        } catch (error) {
            console.error('Error al actualizar el carrito:', error);
            throw error;
        }
    }
}

export default CartDAO;
