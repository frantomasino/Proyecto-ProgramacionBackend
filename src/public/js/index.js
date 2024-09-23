const socket = io();

 socket.on('updateProducts', (products) => {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';
    products.forEach(product => {
        const listItem = document.createElement('li');
        listItem.textContent = `${product.titulo} - $${product.precio} - Stock: ${product.stock} - Categoría: ${product.categoria}`;
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.onclick = () => {
            socket.emit('deleteProduct', product._id);
        };

        listItem.appendChild(deleteButton);
        productList.appendChild(listItem);
    });
});

document.getElementById('productForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const titulo = e.target.titulo.value;
    const precio = e.target.precio.value;
    const stock = e.target.stock.value;
    const categoria = e.target.categoria.value;
    const descripcion = e.target.descripcion.value; 
  
    socket.emit('addProduct', { titulo, precio, stock, categoria, descripcion }); 
    e.target.reset();
  });
  