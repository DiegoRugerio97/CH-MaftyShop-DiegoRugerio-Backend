# Mafty Shop

## Descripción

Repositorio para el código del proyecto Mafty Shop, un e-commerce donde se aplican los conocimientos adquiridos en siguientes cursos de Coderhouse:

* Programación Backend I: Desarrollo Avanzado de Backend
* Programación Backend II: Diseño y Arquitectura de Backend

El servidor fue construido a partir de una arquitectura por capas, cada una definida por su directorio:

* Views: Frontend renderizado desde el servidor
* Router: Definición de los distintos endpoints del servidor, conexión a la capa de controller.
* Controller: Manejo del request, response y llamado a la capa de service.
* Service : Procesamiento de la información de acuerdo a la lógica de negocio establecida, conexión a la capa de Repository.
* Data Transfer Object: Transformación de objectos para su normalización entre capas.
* Repository : Implementación de métodos CRUD de acuerdo al modo de persistencia (DAOs) establecido en la configuración a traves de un patrón de factory.
* Data Access Object : Métodos CRUD propios de la persistencia definida.


## Inicio

### Dependencias

La base del proyecto es el framework Express.js sobre un servidor montado en Node. Se utilizan distintas librerías auxiliares para las distintas funcionalidades del proyecto.

* dotenv : Implementación de archivo .env para las configuraciónes iniciales.
* bcrypt : Hasheo de contraseñas.
* express-handlebars : Renderizado de vistas simples para el frontend.
* jsonwebtoken : Generación de token con fines de autenticación y autorización, manteniendo el servidor stateless.
* moongose : Driver de conexión con MongoDB, simplificando las transacciones y la creación de modelos.
* nodemailer :  Envio de emails para el proceso de reestablecimiento de contraseñas para los usuarios.
* passport : Estrategias de autorización y autenticación utilizando la conexión local con las bases de datos, github y la lectura del jwt.
* socket.io : Implementación de sockets para la actualización de información en tiempo real. 


### Instalación

Se utiliza npm para instalar las dependencias especificadas en el archivo package.json 

```
npm install
```

### Ejecución 

Es necesario un archivo .env con los siguientes campos para iniciar el proyecto:

* PORT : Puerto de deploy del servidor.
* MONGO_URL: String de conexíón a la base de datos de MongoDB
* SECRET : String de secreto para la codificación de datos enviados al cliente.
* CLIENT_SECRET : String de cliente para el OAuth de Github.
* PERSISTENCE : Modo de persistencia del servidor. Por el momento únicamente MONGODB esta implementado.
* ORIGIN_MAIL : Dirección de email de notificaciones.
* ORIGIN_PASS : Password/Passcode del email.

Se inicia el servidor con el comando
```
npm start
```

# Endpoints

El servidor cuenta las siguientes rutas y endpoints, con sus respectivos middlewares de autenticación y autorización. En su mayoría, es necesario estar logado en la aplicación para poder acceder a la información presentada por los endpoints.

## Products
* GET <span style="color:#034efc">/api/products</span> : Regresa la lista de productos existentes en la base de datos, acepta query parameters (limit, page, queryField y queryVal) para la paginación utilizando Moongose.
* GET <span style="color:#034efc">/api/products/pId</span> : Información de un solo producto, consultando la persistencia por el ID del producto.
* POST <span style="color:#034efc">/api/products</span> - Unicamente ADMIN : Creación de un nuevo producto con información enviada por el body del request.
* PUT <span style="color:#034efc">/api/products/pId</span> - Unicamente ADMIN : Actualización de los campos de un producto con información enviada por el request body por el ID del producto.
* DELETE <span style="color:#034efc">/api/products/pId</span> - Unicamente ADMIN : Eliminación de un producto del catálogo por el ID del producto.  

## Carts
* GET <span style="color:#034efc">/api/carts/cId</span> - Unicamente si el carrito es el mismo asignado al usuario: Información de un solo carrito, consultando la persistencia por el ID del carrito.
* POST <span style="color:#034efc">/api/carts</span> - Unicamente ADMIN : Creación de un nuevo carrito.
* POST <span style="color:#034efc">/api/carts/cId/products/pId</span> - Unicamente si el carrito es el mismo asignado al usuario : Se agrega el producto especificado por el ID del producto al carrito especificado por el ID del carrito.
* PUT <span style="color:#034efc">/api/carts/cId/products/pId</span> : Actualización de la cantidad de un producto existente dentro del carrito especificado por el ID del carrito.
* PUT <span style="color:#034efc">/api/carts/cId/products</span> : Actualización del arreglo de productos de un carrito especificado por el ID del carrito con la información enviada por el request body.
* DELETE <span style="color:#034efc">/api/carts/cId</span> : Se eliminan los productos del carrito especificado por el ID del carrito.

## Users
* POST <span style="color:#034efc">/api/sessions/register</span> : Creación de un nuevo usuario con la información proporcionada en el request body.
* POST <span style="color:#034efc">/api/sessions/login</span> : Inicio de sesión de acuerdo a las credenciales proporcionadas en el request body. Regresa un JWT en forma de cookie HTTP con el cual es posible autenticarse y obtener autorización dentro del servidor.
* GET <span style="color:#034efc">/api/sessions/current</span> : Información del usuario logeado.
* GET <span style="color:#034efc">/api/sessions/github</span> y  <span style="color:#034efc">/api/sessions/githubcallback</span> : Registro e inicio de sesión por medio de una cuenta de Github.
* POST <span style="color:#034efc">/api/sessions/forgetPassword</span> : Inicia el proceso de reestablecimiento de cuenta enviando un correo de recuperación.
* POST <span style="color:#034efc">/api/sessions/resetPassword</span> : Reestablece la contraseña validando el token de autenticación proporcionado al usuario.
* GET <span style="color:#034efc">/api/sessions/logout</span> : Cierra la sesión del usuario, eliminando la cookie HTTP con el JWT del usuario.

## Tickets
* POST <span style="color:#034efc">/api/tickets/checkout</span> : Creación de un nuevo ticket utilizando el carrito asignado al usuario logeado.
 * GET <span style="color:#034efc">/api/tickets</span> : Lista de tickets creados por el usuario logeado.

## Creado por

Diego Rugerio Castillo
