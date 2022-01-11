/*
    ruta:'/api/uploads'

*/

const { Router } = require('express');
const expressFileUpLoad = require('express-fileupload');
const { validarJWT } = require('../middlewares/validar-jwt');
const { fileUpload, retornaImagen } = require('../controladores/uploads');



const router = Router();

//con expressFileUpload podremos recibir los archivos
router.use( expressFileUpLoad() );

router.put('/:tipo/:id', validarJWT, fileUpload  );


router.get('/:tipo/:foto', retornaImagen  );


module.exports =router