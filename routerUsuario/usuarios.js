/*

ruta : /api/usuarios



*/
//RUTAS 
//RUTAS 
//RUTAS 

const { Router } = require('express');
const { check } = require('express-validator')
const { getUsuarios, borrarUsuario } = require('../controladores/usuario-controler')
const { crearUsuario , actualizarUsuario } = require('../controladores/usuario-controler')
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

// ruta para visualizar datos
//ingresaremos en el 2do parametros el middleweare para leer el JWT
router.get( '/' ,validarJWT , getUsuarios );


//ruta para registrar
router.post(
     '/' ,
    [   
      
        check('nombre',"el nombre es obligatorio").not().isEmpty(),
        check('password',"el password es obligatorio").not().isEmpty(),
        check('email',"el email es obligatorio").isEmail(),
        //aca llamamos a validar campos
        validarCampos,
        
    ]  
    ,crearUsuario );

//ruta para actualizar 

router.put( '/:id', 

[
    validarJWT,
    check('nombre',"el nombre es obligatorio").not().isEmpty(), 
    check('email',"el email es obligatorio").isEmail(),
   // check('role',"el rol es obligatorio").isEmail(), 
    //aca llamamos a validar campos
    validarCampos,
]  ,actualizarUsuario)

router.delete('/:id' , 
    [
        
        validarJWT,
    ] , borrarUsuario)

module.exports = router;