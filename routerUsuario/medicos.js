/*
    ruta:'/api/medicos'
*/

const { Router } = require('express');
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { 
    getMedico,
    crearMedico,
    actualizarMedico,
    borrarMedico 
    } = require('../controladores/medicos');

const router = Router();

// ruta para visualizar datos
//ingresaremos en el 2do parametros el middleweare para leer el JWT
router.get( '/'  , 

        getMedico );


//ruta para registrar
router.post(
     '/' ,
    [   
        validarJWT,
        check('nombre','El nombre  del medico es necesario').not().isEmpty(),
        check('hospital','El hospital id debe de ser valido').isMongoId(),
        validarCampos
        
    ]  
    ,crearMedico );

//ruta para actualizar 

router.put( '/:id', 

[
    validarJWT,
    check('nombre','El nombre  del medico es necesario').not().isEmpty(),
    validarCampos
]  ,actualizarMedico)

router.delete('/:id' , 
    [
        validarJWT,
    ] , borrarMedico)

module.exports = router;