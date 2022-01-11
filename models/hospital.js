const {Schema , model } = require('mongoose');

//definicion de cada registro de una tabla  (TABLA USUARIO)
const HospitalSchema = Schema({
    nombre : {
        type: String,
        require:true
    },
    imagen : {
        type : String,
    },
    usuario:{
        //mongo que va ver una relacion en este schema con el schema Usuario
        require:true,
        type:Schema.Types.ObjectId,
        ref:'Usuario'
    }
   
    //asi se aparecera en Mongo el nombre de la Tabla
},{ collection:'hospitales'  });

//para cambiar el nombre de la variables del modelo 
HospitalSchema.method('toJSON', function(){
    const { __v,...object} = this.toObject();
  
    return object;
})

//exportar para que cualquiera pueda hacer operaciones CRUD en esta tabla 
module.exports = model('Hospital', HospitalSchema);