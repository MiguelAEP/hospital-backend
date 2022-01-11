//crear el servidor express
const express = require('express');


//haremos una confg  : ACA LEEMOS LA VARIABLE DE ENTORNO SERIA AL ARCHIVO .ENV
require('dotenv').config();

//llamos a los cors
const cors = require('cors')

//importamos la cadena d conexion
const { dbConnection } = require('./database/config')

//Crear servidor de express
const app = express();

//configurar CORS
app.use( cors())

//para recibir el usuario por parte de express usaremos express.json()
//Lectura y parseo del body
app.use( express.json());

//hacemos conexion ala base de datos

dbConnection();

//DIRECTORIO PUBLICO , cualquier persona podra ver el contenido desplegado en public
app.use( express.static('public'));


//Rutas podremos verlo en tomcat
//es un midlewar : todas las rutas empezaran con /api/usuarios
//cuando alguien pase x esa ruta , se necesitara usar el archivo del router
//routerUsuarios .
app.use('/api/usuarios',require('./routerUsuario/usuarios'))

//ruta para login
app.use('/api/login',require('./routerUsuario/auth'))

//ruta para hospital
app.use('/api/hospitales',require('./routerUsuario/hospitales'))

//ruta para medico
app.use('/api/medicos',require('./routerUsuario/medicos'))

//ruta para busqueda
app.use('/api/todo',require('./routerUsuario/busquedas'))

//ruta para uploads
app.use('/api/uploads',require('./routerUsuario/uploads'))


//para levantar el server
app.listen( process.env.PORT, () =>{
    console.log('Servidor corriendo en el puerto', process.env.PORT)
})