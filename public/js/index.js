const socket = io();

socket.on('updateProducts', (products) => {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';
    products.forEach(product => {
        const listItem = document.createElement('li');
        listItem.textContent = `${product.title} - ${product.price}`;
        productList.appendChild(listItem);
    });
});

document.getElementById('productForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const product = {
        title: formData.get('title'),
        price: formData.get('price')
    };
    socket.emit('addProduct', product);
    event.target.reset();
});
