import Cart from '../models/Cart.js';

export const CartRepository = {
  create: async (cartData) => {
    const newCart = new Cart(cartData);
    await newCart.save();
    return newCart;
  },
  
  // Otras funciones para actualizar, obtener, etc.
};
