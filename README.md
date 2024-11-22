# eCommerce Backend


Este proyecto es un backend para un eCommerce, desarrollado con Node.js y Express, diseñado para gestionar productos, carritos, usuarios y tickets. Utiliza una arquitectura modular y escalable que facilita el mantenimiento y la expansión.

Características principales:

- Gestión de productos y carritos: CRUD completo para productos y carritos, con persistencia inicial en archivos JSON.
- Autenticación y autorización: Uso de Passport.js y JWT para gestionar usuarios, roles y acceso a rutas protegidas.
- Gestión de usuarios y tickets: CRUD para usuarios y creación de tickets de compra.

Modularidad:

- DAOs: Abstracción del acceso a datos.
- DTOs: Validación y estandarización de datos.
- Middlewares: Control de errores, roles y autenticación.
- Repositorios y servicios: Lógica de negocio separada.

Tecnologías y herramientas:

- Node.js, Express, Handlebars, Passport.js, y JWT.
- Arquitectura preparada para migrar de persistencia en archivos JSON a bases de datos modernas como MongoDB.

Objetivo:

Ofrecer un backend escalable y modular para gestionar un eCommerce, facilitando la integración de nuevas funcionalidades y el crecimiento del proyecto.




## Estructura del Proyecto

src/
│
├── config/
│   └── passport.js            
│
├── controllers/
│   ├── authController.js      
│   ├── cartController.js      
│   ├── productController.js   
│   ├── ticketController.js    
│   └── userController.js      
│
├── daos/
│   ├── cartDAO.js             
│   ├── productDAO.js          
│   ├── ticketDAO.js           
│   └── userDAO.js             
│
├── dtos/
│   ├── cartDTO.js             
│   ├── productDTO.js          
│   ├── ticketDTO.js           
│   └── userDTO.js             
│
├── middlewares/
│   ├── authMiddleware.js      
│   ├── errorHandler.js        
│   └── roleMiddleware.js      
│
├── models/
│   ├── Cart.js                
│   ├── Product.js             
│   ├── Ticket.js              
│   └── User.js                
│
├── repositories/
│   ├── cartRepository.js      
│   ├── productRepository.js   
│   ├── ticketRepository.js    
│   └── userRepository.js      
│
├── routes/
│   ├── authRoutes.js          
│   ├── cartRoutes.js          
│   ├── productRoutes.js       
│   ├── ticketRoutes.js        
│   └── userRoutes.js           
│
├── services/
│   ├── ticketService.js       
│
├── views/
│   ├── layouts/
│   │   └── main.handlebars    
│   ├── home.handlebars        
│   └── realTimeProducts.handlebars 
│
├── app.js                     
├── .env                       
├
├── node_modules/
├── package.json
├── package-lock.json
└── README.md
└── .gitignore


## Inicio del servidor 

node src/app.js
 



 
 