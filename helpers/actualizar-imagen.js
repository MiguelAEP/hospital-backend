
//con esta importacion podemos leer las carpetas y archivos
const fs = require('fs');
const Usuario = require('../models/usuario')
const Medico = require('../models/medico')
const Hospital = require('../models/hospital')

const borrarImagen = (path) =>{

    if(fs.existsSync(path)){
        //borrar la imagen anterior para q cada vez q subamos fotos no se vayan acumulando
        fs.unlinkSync(path)
    }
}
const actualizarImagen =async (tipo , id  , nombreArchivo)=>{
    let pathViejo = '';
    switch (tipo) {
        case 'medicos':
            const medico =await Medico.findById(id);
            if( !medico ){
                return false;
            }
             pathViejo = `./uploads/medicos/${medico.imagen}`;
            borrarImagen(pathViejo)
            medico.imagen = nombreArchivo;
            await medico.save();
            return true;
        break;
        case 'hospitales':
             const hospital =await Hospital.findById(id);
            if( !hospital ){
                return false;
            }

            pathViejo = `./uploads/hospitales/${hospital.imagen}`;
            
            borrarImagen(pathViejo)
           
            hospital.imagen = nombreArchivo;
            await hospital.save();
            return true;
        break;
        case 'usuarios':
            const usuario =await Usuario.findById(id);
            if( !usuario ){
                return false;
            }

             pathViejo = `./uploads/usuarios/${usuario.imagen}`;
            
            borrarImagen(pathViejo)
           
            usuario.imagen = nombreArchivo;
            await usuario.save();
            return true;
        break;
  
        default:
            break;
    }



}

module.exports={
    actualizarImagen
}