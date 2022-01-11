/*
    ruta:'/api/hospitales'
*/

const { Router } = require('express');
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const { 
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
    } = require('../controladores/hospitales');

const router = Router();

// ruta para visualizar datos
//ingresaremos en el 2do parametros el middleweare para leer el JWT
router.get( '/'  , getHospitales );


//ruta para registrar
router.post(
     '/' ,
    [   
        validarJWT,
        check('nombre','El nombre  del hospital es necesario').not().isEmpty(),
        validarCampos
    ]  
    ,crearHospital );

//ruta para actualizar 

router.put( '/:id', 

[
        validarJWT,
        check('nombre','El nombre  del hospital es necesario').not().isEmpty(),
        validarCampos
]  ,actualizarHospital)

router.delete('/:id' , 
    [
        validarJWT,
    ] , borrarHospital)

module.exports = router;