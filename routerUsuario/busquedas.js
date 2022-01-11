/*
    ruta:'/api/todo/:busqueda'
    ruta:'api/coleccion/:tabla/:busqueda
*/

const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getTodo , getDocumentosColeccion} = require('../controladores/busquedas')
const router = Router();

router.get( '/:parametro', validarJWT,getTodo );


router.get( '/coleccion/:tabla/:parametro', validarJWT,getDocumentosColeccion );

module.exports =router