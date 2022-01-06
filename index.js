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


//hacemos conexion ala base de datos
dbConnection();

console.log(process.env)
//Rutas
app.get( '/' ,(req , res ) =>{

    res.json({
        ok:true,
        mgs:'hola mundo'
    });
} );


//para levantar el server
app.listen( process.env.PORT, () =>{
    console.log('Servidor corriendo en el puerto', process.env.PORT)
})