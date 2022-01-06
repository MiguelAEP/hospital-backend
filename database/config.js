//importamos el paquete mongoose
const mongoose = require('mongoose');


//crearemos una funcion que establecera la conexion
//regresa una promesa

const dbConnection = async () => {
    try {
            // hacemos un await para q espere q todo eso pase y trabajar en forma sincrona
            //process.env.DB_CNN lo llamos aca por medio de la variable de entorno del archivo .env
        await mongoose.connect(process.env.DB_CNN, {
        });

        console.log('Connection succsessful');

    } catch (error) {
        console.error(error);
        throw new Error('Error trying to connect');
    }
}
//EXPORTAMOS LA FUNCION dbConnection
module.exports = {
    dbConnection
}