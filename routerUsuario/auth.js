/**
  path : '/api/login
 */

const {Router} = require('express');
const { check } = require('express-validator')
const { login, googleSignIn, renewToken } = require('../controladores/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

router.post('/',
[
    check('email','el email es obligatorio').isEmail(),
    check('password','es obligatorio el password').not().isEmpty(),
    validarCampos
],
login

);


router.post('/google',
[
  
    check('token','el token es obligatorio').not().isEmpty(),
    validarCampos
],
googleSignIn

);


router.get('/renew' , validarJWT , renewToken);




module.exports = router