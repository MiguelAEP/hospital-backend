
const jwt = require('jsonwebtoken');

const validarJWT = (req, res ,next)=>{

    //se leera el token desde los headers 
    const token = req.header('x-token');
        if (!token){
            return res.status(401).json({
                ok : false,
                msg:'no hay token en la peticion'
            })
        }

        try {
            //pide el token ,clave secreta  para q compruebe q hagan match , si 
            //no funciona lo atrapa en el catch
            const { uid } = jwt.verify(token,process.env.JWT_SECRET)

            req.uid = uid;
            next();
            
        } catch (error) {
            return res.status(401).json({
                ok :false,
                msg:'token incorrecto'
            })
        }
  
}

module.exports ={
    validarJWT
}