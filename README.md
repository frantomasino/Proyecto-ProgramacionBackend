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
 


## Pasos para instalar y ejecutar


1. Clonar el repositorio: 

Clona este proyecto en tu máquina local usando:  git clone <URL_DEL_REPOSITORIO>



2. Instalar dependencias

Accede al directorio del proyecto e instala las dependencias con: cd <directorio_del_proyecto>
npm install


3. Configurar las variables de entorno

Crea un archivo .env en la raíz del proyecto (o dentro de src, si el código está configurado para buscarlo ahí). Copia el siguiente contenido en el archivo .env y ajusta los valores según tu configuración:

.env
MONGO_URI=mongodb+srv://<usuario>:<contraseña>@<cluster>.mongodb.net/<base_de_datos>?retryWrites=true&w=majority
PORT=8080
JWT_SECRET=<clave_secreta>


4. Ejecutar el servidor

Inicia el servidor con:  node src/app.js


Si todo está configurado correctamente, deberías ver en la consola:

JWT_SECRET: <clave_secreta>
MONGO_URI: <URI_de_MongoDB>
Servidor corriendo en http://localhost:8080
Conexión exitosa a MongoDB


