const {response} = require('express')
const Hospital = require('../models/hospital')
const getHospitales = async(req , res=response) =>{

//MOSTRAR LISTADO DE LOS HOSPITALES

 const hospitales =await Hospital.find()
                            .populate('usuario','nombre img')
    res.json({
        ok: true,
        hospitales
    })
}

const crearHospital= async(req , res=response) =>{
  
    //el uid del usuario q se autentico con el token
    const uid = req.uid;

      //aca almanecera los datos en hospital
      const hospital = new Hospital({
          usuario:uid,
          ...req.body
      }) ;

    try {
        
       const hospitalDB =  await hospital.save();
        res.json({
            ok: true,
             hospital: hospitalDB
        })

        

    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }



    
}

const actualizarHospital = async(req , res=response) =>{

    const id = req.params.id;
    const uid = req.uid;
    try {

        const hospital = await Hospital.findById(id);
        if(!hospital){
            return res.status(404).json({
                ok:true,
                msg:'hospital no encontrado por di'
            })
        }

        const cambiosHospital ={
            ...req.body,
            usuario:uid
        }

        const hospitalActualizado = await Hospital.findByIdAndUpdate(id,cambiosHospital,{new : true});

        res.json({
            ok: true,
            hospital : hospitalActualizado
        })
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Hable con administrador'
        })
    }


 
}


const borrarHospital =async (req , res=response) =>{

    const id = req.params.id;


    try {

        const hospital = await Hospital.findById(id);
        if(!hospital){
            return res.status(404).json({
                ok:true,
                msg:'hospital no encontrado por di'
            })
        }

       await Hospital.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg:'hospital eliminado'
        })

    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Hable con administrador'
        })
    }

  
}

module.exports={
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}