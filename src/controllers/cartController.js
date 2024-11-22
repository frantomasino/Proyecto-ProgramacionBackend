import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import Ticket from "../models/Ticket.js";

class CartController {
   static async createCart(req, res) {
    try {
      const newCart = await Cart.create({ products: [] });
      return res.status(201).json({
        status: "success",
        message: "Carrito creado exitosamente.",
        cart: newCart,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Error al crear el carrito.",
        error: error.message,
      });
    }
  }

   static async addToCart(req, res) {
    try {
      const { cartId, products } = req.body;

       const cart = await Cart.findById(cartId);
      if (!cart) {
        return res.status(404).json({
          status: "error",
          message: "Carrito no encontrado.",
        });
      }

      const outOfStockProducts = []; 
      for (const item of products) {
        const product = await Product.findById(item.product);
        if (!product) {
          return res.status(404).json({
            status: "error",
            message: `Producto con ID ${item.product} no encontrado.`,
          });
        }

         if (product.stock < item.quantity) {
          outOfStockProducts.push({
            product: product.name,
            stockAvailable: product.stock,
            requested: item.quantity,
          });
        } else {
           const productInCart = cart.products.find((p) => p.product.equals(item.product));
          if (productInCart) {
            productInCart.quantity += item.quantity;
          } else {
            cart.products.push(item);
          }
        }
      }

       if (outOfStockProducts.length > 0) {
        return res.status(400).json({
          status: "error",
          message: "Algunos productos no tienen suficiente stock.",
          outOfStockProducts,
        });
      }

       await cart.save();

      return res.status(200).json({
        status: "success",
        message: "Productos agregados al carrito.",
        cart,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Error al agregar productos al carrito.",
        error: error.message,
      });
    }
  }

   static async purchaseCart(req, res) {
    try {
      const { cartId, email } = req.body;

      const cart = await Cart.findById(cartId).populate("products.product");

      if (!cart) {
        return res.status(404).json({
          status: "error",
          message: "Carrito no encontrado.",
        });
      }

       let totalAmount = 0;
      const outOfStockProducts = [];
      for (const item of cart.products) {
        if (item.product.stock < item.quantity) {
          outOfStockProducts.push(item.product.name);
        } else {
          totalAmount += item.product.price * item.quantity;
          item.product.stock -= item.quantity;
          await item.product.save();
        }
      }

      if (outOfStockProducts.length > 0) {
        return res.status(400).json({
          status: "error",
          message: "Algunos productos no tienen suficiente stock.",
          products: outOfStockProducts,
        });
      }

       const ticket = await Ticket.create({
        code: `TICKET-${Date.now()}`,
        amount: totalAmount,
        purchaser: email || "guest",
      });

       cart.products = [];
      await cart.save();

      return res.status(200).json({
        message: "Compra realizada con éxito.",
        ticket,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Error al realizar la compra.",
        error: error.message,
      });
    }
  }
}

export default CartController;
