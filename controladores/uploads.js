const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require("../helpers/actualizar-imagen");

const fs = require('fs');
//importar para crear un pat
const path = require('path');

const fileUpload = ( req , res = response) =>{

    const tipo = req.params.tipo;
    const id = req.params.id;
    
    const tiposValidos = ['hospitales','medicos','usuarios'];
    if(!tiposValidos.includes(tipo)){
        return res.status(400).json({
            ok:false,
            msg:'no es medico, usuario u hospital '
        })
    }
    

    //VALIDAR QUE EXISTA UN ARCHIVO
    if( !req.files || Object.keys(req.files).length ===0){
        return res.status(400).json({
            ok:false,
            msg:'no hay ningun archivo'
        })
    }

    //PROCESAR LA IMAGEN...

    //files ya tiene guardado la imagen
    const file = req.files.imagen;
    //extraer la extension del archivo

    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[nombreCortado.length -1];

    //validar extension

    const extensionesValidas = ['png','jpg','jpeg','gif'];

    if( !extensionesValidas.includes(extensionArchivo)){
        return res.status(400).json({
            ok:false,
            msg:'no es una extension permitida'
        })
    }

    //generar el nombre del archivo
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}` ;
  
    
    //Path para guardar la imagen
    const path = `./uploads/${tipo}/${nombreArchivo}`;

    console.log(nombreArchivo)
    
  //Move la imagen
  file.mv(path, (err)=> {
      
    if (err){
        return res.status(500).json({
            ok:false,
            msg:'error al mover imagen'
        });
    }


    //ACTUALIZAR BASE DE DATOS
    actualizarImagen(tipo , id , nombreArchivo);



    res.json({
        ok:true,
        msg:'Archivo subido',
        nombreArchivo,
        
    })

  });

    
}


const retornaImagen = (req , res = response) =>{
    const tipo = req.params.tipo;
    const foto = req.params.foto;

    //consturir un path donde apunte la imagen de los usuarios ,hospital,etc

    //dirname  = donde se encuentra desplegado mi app
    const pathImg = path.join(__dirname,`../uploads/${tipo}/${foto}`);

    // si existe la imagen lo regresa
    if(fs.existsSync(pathImg)){
        res.sendFile(pathImg);
    }
    //si no existe regrsa la imagen x defecto
    else{
        const pathImg = path.join(__dirname,`../uploads/descarga.png`);
        res.sendFile(pathImg);
    }

   

}
module.exports = {
    fileUpload,
    retornaImagen
}