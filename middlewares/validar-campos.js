//para que valide campo a campo
const { response } = require('express')
const { validationResult } = require('express-validator')
const validarCampos = (req , res=response , next) =>{

   
    //atrapar los midle wear sobre las validaciones
    //validationResult(req) creara un arreglo de erorres que pasaron en la ruta
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({
            ok:false,
            errors:errores.mapped()
        })
    }

   next();
}

module.exports = {
    validarCampos
}