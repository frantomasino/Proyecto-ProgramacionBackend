# eCommerce Backend

Este proyecto es una aplicación de backend para un eCommerce, desarrollado con Node.js y Express. El servidor maneja rutas para productos y carritos, permitiendo realizar operaciones CRUD sobre los productos y gestionar los carritos de compras. La persistencia de datos se realiza utilizando el sistema de archivos (File System) en archivos JSON.

## Estructura del Proyecto

src/
│
├── routes/
│   ├── products.router.js
│   └── carts.router.js
│   ├── views.router.js
├── services/
│   ├── ProductManager.js
│   └── CartManager.js
├── views/
│   ├── layouts/
│   │   └── main.handlebars
│   ├── home.handlebars
│   └── realTimeProducts.handlebars
│
└── app.js
└── utils.js
│data/
├── products.json
└── carrito.json
├public/
└── js/
│    └── index.js
├── node_modules
├── package.json
├── package-lock.json
└── README.md

## Inicio del servidor 

nodemon src/app.js
 
### Uso


**Home**: `http://localhost:8080/home` - Muestra una lista de productos.
**Real-Time Products**: `http://localhost:8080/realtimeproducts` - Gestión de productos en tiempo real.



src/ │ ├── routes/ │ ├── products.router.js # Rutas para la gestión de productos │ └── carts.router.js # Rutas para la gestión de carritos │ ├── services/ │ ├── ProductManager.js # Gestión de productos (CRUD) │ └── CartManager.js # Gestión de carritos (CRUD) │ ├── views/ │ ├── layouts/ │ │ └── main.handlebars # Plantilla principal para Handlebars │ ├── home.handlebars # Vista para mostrar la lista de productos │ └── realTimeProducts.handlebars # Vista para productos en tiempo real │ ├── utils.js # Funciones utilitarias para el proyecto └── app.js # Archivo principal del servidor │ data/ ├── products.json # Archivo JSON con los productos └── carrito.json # Archivo JSON con los carritos │ public/ ├── js/ │ └── index.js