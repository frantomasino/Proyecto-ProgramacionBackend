const express = require('express');
const app = express();
const port = 8080;


app.get('/', (req, res) => {
    res.send('Bienvenido al eCommerce');
});


app.use(express.json());

app.use('/api/products', require('./routes/products.router'));
 

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
