//para q ayude al tipado en el res
const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

//solo funciones a exportar

const getUsuarios = async(req , res ) =>{
    
    //aca se hara la paginacion con req.require.desde podremos capturarlo 
    //(desde = es lacantidad de pagina)
    //si no manda un valor en la paginacion , automaticamente sera 0
    const desde = Number(req.query.desde) || 0;
    console.log(desde)

        //PROMISE.ALL regresa un arreglo d promesa
        //la primera posicion sera usuarios, y la 2da total 
    const [ usuarios , totalRegistros ] = await Promise.all([
        Usuario
        .find({},'nombre email role google imagen')
               .skip(desde)
              .limit(5) ,
        Usuario.countDocuments()                                

    ])



    res.json({
        ok:true,
        usuarios,
        totalRegistros
    });
}

const crearUsuario = async (req , res = response ) =>{

    const { email , password } = req.body;
  
    try {

          //si el usuario existe
        const existeEmail = await Usuario.findOne({email})

        if( existeEmail ){
            return res.status(400).json({
                ok: false,
                msg : "el correo ya esta registrado"
            })
        }

        const usuario = new Usuario( req.body );

        //ENCRIPTAR CONTRASEÑA 
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt)

        //graba en una bd
        await usuario.save();

        //generar jtw 
        const token =await generarJWT(usuario.uid)
    
        res.json({
            ok:true,
            usuario : usuario,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error inesperado'
        })
    }
}

const actualizarUsuario =async (req , res=response) =>{
    
    const uid = req.params.id;
    try {
       //aca guardamos el usuario por medio de su ID
        const usuarioDB = await Usuario.findById(uid)
        //si esque se encuentra el id
        if (!usuarioDB) {
            return res.status(404).json({
                ok:false,
                msg :'No existe el usuario con ese id'
            })
        }
        //aca tendra toda la info
        const {password, google , email, ...campos} = req.body;

        //si el email es diferente al email del reques .body
        if( usuarioDB.email !== email){
                //extraeremos el email q el usuario escribio
            const existeEmail = await Usuario.findOne( { email })
             if(existeEmail){
                 return res.status(400).json({
                     ok : false,
                     msg :'Ya existe ese usuario con ese email'
                 })
             }
        }

        //actualizacion
        campos.email = email;

        //(uid = id usuario , campos = la info q se actualizara)
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {new : true})

        res.json({
            ok:true,
            usuario : usuarioActualizado
        })

    } catch (error) {
            console.log(error);
            res.status(500).json({
                ok:false,
                msg :'Error inesperado'
            })
    }
}


const borrarUsuario = async (req, res=response)=>{

    const uid = req.params.id;
    try {
        const usuarioDB = await Usuario.findById(uid)

        //si el usuario no existe
          if( !usuarioDB ){
            return res.status(404).json({
                ok: false,
                msg : "el correo ya esta registrado"
            })
        }
        // si existe se borrara
        await Usuario.findByIdAndDelete(uid)

        res.status(200).json({
            ok:true,
            msg:'usuario eliminado'
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg:"Error inesperado"
        })
    }

}
module.exports={
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}