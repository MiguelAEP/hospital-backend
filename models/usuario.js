const {Schema , model } = require('mongoose');

//definicion de cada registro de una tabla  (TABLA USUARIO)
const UsuarioSchema = Schema({
    nombre : {
        type: String,
        require:true
    },
    email : {
        type: String,
        require:true,
        unique: true
    },
    password : {
        type: String,
        require:true
    },
    imagen : {
        type : String,
    },
    rol : {
        type: String,
        require:true,
        default: "USER_ROLE"
    },
    google : {
        type: Boolean,
        default: false
    },
});

//para cambiar el nombre de la variables del modelo 
UsuarioSchema.method('toJSON', function(){
    const { __v, _id ,password, ...object} = this.toObject();
    object.uid = _id;
    return object;
})

//exportar para que cualquiera pueda hacer operaciones CRUD en esta tabla 
module.exports = model('Usuario', UsuarioSchema);