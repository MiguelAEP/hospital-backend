const bcrypt = require('bcryptjs');
const { response} = require('express');
const { generarJWT } = require('../helpers/jwt');
const Usuario = require('../models/usuario');
const { googleVerify }  = require('../helpers/google-verifify');
const usuario = require('../models/usuario');

const login = async (req, res = response)=>{
    const { email , password } = req.body;
    try {
        //verificar email
        const usuarioDB = await Usuario.findOne({email})

        if(!usuarioDB){
            return res.status(404).json({
                ok:false,
                msg:'email no valida'
            })
        }

        //verificar contraseña = retornara un true si hacen match
        const validadPassword = bcrypt.compareSync( password,usuarioDB.password );

        if ( !validadPassword){
            return res.status(400).json({
                ok:false,
                msg :'contraseña no valida'
            })
        }

        //GENERAR EL TOKEN - JWT
        //aca firmamos 
        const token =await generarJWT(usuarioDB.id)


        res.json({
            ok:true,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'Hable con el admin'
        })
    }
}

const googleSignIn =async ( req , res = response)=>{

    const googleToken = req.body.token;

    try {

        //regresa un usuario de google
      const {name ,email ,picture} = await googleVerify(googleToken);

      //VERIFICAR SI existe un usuario en la bd con ese email
      const usuarioDB = await Usuario.findOne({email});
      let usuario;

      //si no existe el usuario
      if(!usuarioDB){
        usuario = new Usuario({
            nombre : name,
            email,
            password:'@@',
            imagen:picture,
            google:true
        })
      }
      //esta volviendo a autenticarse
      else{
          usuario = usuarioDB;
          usuario.google = true
      }

      //guardar en base de datos
      await usuario.save();

       //generar jwt 
       const token =await generarJWT(usuarioDB.id)

        res.json({
            ok:true,
            token

        })
        
    } catch (error) {
        res.status(401).json({
            ok:false,
            msg:'Token incorrecto'
        })
    }
}


const renewToken =async (req , res = response ) =>{

    const uid = req.uid;
    //generar token
    const token = await generarJWT(uid);

    res.json({
        ok:true,
        uid,
        token
    })


}

module.exports={
     login,
     googleSignIn,
     renewToken
}