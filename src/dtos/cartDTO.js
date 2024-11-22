class CartDTO {
    constructor(cart) {
      this.id = cart._id;
      this.userId = cart.userId;
      this.products = cart.products.map(product => ({
        productId: product.productId,
        quantity: product.quantity
      }));
    }
  }
  
  export default CartDTO;
  