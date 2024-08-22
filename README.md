# eCommerce Backend

Este proyecto es una aplicación de backend para un eCommerce, desarrollado con Node.js y Express. El servidor maneja rutas para productos y carritos, permitiendo realizar operaciones CRUD sobre los productos y gestionar los carritos de compras. La persistencia de datos se realiza utilizando el sistema de archivos (File System) en archivos JSON.

## Estructura del Proyecto

📦 tu-proyecto-ecommerce/
├── 📂 data/
│ ├── products.json
│ └── carrito.json
├── 📂 src/
│ ├── 📂 routes/
│ │ ├── products.router.js
│ │ └── carts.router.js
│ ├── 📂 services/
│ │ ├── ProductManager.js
│ │ └── CartManager.js
│ └── app.js
├── 📂 node_modules/
├── package.json
├── package-lock.json
└── README.md

## Inicio del servidor 

node src/app.js
 
