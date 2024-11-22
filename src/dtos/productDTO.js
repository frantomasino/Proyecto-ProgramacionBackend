export const productDTO = (product) => {
    return {
      id: product._id,
      name: product.name,
      price: product.price,
      description: product.description,
    };
  };
  