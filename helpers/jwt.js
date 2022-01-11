const jwt = require('jsonwebtoken');

const generarJWT = ( uid ) =>{
    return new Promise( (resolve , reject) =>{
    
     const payload ={uid} ;

    //aca creamos el jwt ( aca lo firmaremos)
    //(primero lo q firmaremos payload, luego la clave secreta , cuanto timepo vigencia jwt)
    jwt.sign(  payload ,process.env.JWT_SECRET,{
        expiresIn:'24h'
    },(err, token)=>{
        if(err){
            console.log(err);
            reject('No se pudo generar jwt');

        }else{
            resolve(token)
        }
    } )

    })
    
}

module.exports = {
    generarJWT
}