// src/controllers/productController.js
import Product from "../models/Product.js";

// Función para crear un producto
export const createProduct = async (req, res) => {
  try {
    const { producto, price, description, stock, email } = req.body;

    // Validar que todos los campos necesarios están presentes
    if (!producto || !price || !description || !stock || !email) {
      return res.status(400).json({
        status: "error",
        message: "Todos los campos son obligatorios: producto, price, description, stock, email.",
      });
    }

    // Crear el producto
    const newProduct = await Product.create({
      producto,
      price,
      description,
      stock,
      email,
    });

    res.status(201).json({
      status: "success",
      message: "Producto creado exitosamente",
      product: newProduct,
    });
  } catch (error) {
    console.error("Error al crear el producto:", error.message);
    res.status(500).json({
      status: "error",
      message: "Ocurrió un error al crear el producto",
    });
  }
};

// Función para eliminar un producto
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params; // Obtenemos el ID del producto desde los parámetros de la URL

    // Intentamos eliminar el producto por su ID
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        status: "error",
        message: "Producto no encontrado",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Producto eliminado exitosamente",
    });
  } catch (error) {
    console.error("Error al eliminar el producto:", error.message);
    res.status(500).json({
      status: "error",
      message: "Ocurrió un error al eliminar el producto",
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params; 
    const { producto, price, description, stock, email } = req.body;  

    if (!producto && !price && !description && !stock && !email) {
      return res.status(400).json({
        status: "error",
        message: "Al menos un campo debe ser proporcionado para la actualización.",
      });
    }

    // Actualizar el producto
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { producto, price, description, stock, email },
      { new: true } 
    );

    if (!updatedProduct) {
      return res.status(404).json({
        status: "error",
        message: "Producto no encontrado",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Producto actualizado exitosamente",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error al actualizar el producto:", error.message);
    res.status(500).json({
      status: "error",
      message: "Ocurrió un error al actualizar el producto",
    });
  }
};
