const {Schema , model } = require('mongoose');

//definicion de cada registro de una tabla  (TABLA USUARIO)
const MedicoSchema = Schema({
    nombre : {
        type: String,
        require:true
    },
    
    imagen : {
        type : String,
    },
    usuario : {
        type: Schema.Types.ObjectId,
        ref:'Usuario',
        require:true
    },
    hospital : {
        type: Schema.Types.ObjectId,
        ref:'Hospital',
        require:true
    },
});

//para cambiar el nombre de la variables del modelo 
MedicoSchema.method('toJSON', function(){
    const { __v, ...object} = this.toObject();
    return object;
})

//exportar para que cualquiera pueda hacer operaciones CRUD en esta tabla 
module.exports = model('Medico', MedicoSchema);