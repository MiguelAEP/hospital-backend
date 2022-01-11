const {response} = require('express')
const Medico = require('../models/medico')


const getMedico = async(req , res=response) =>{

    const Medicos =await Medico.find()
            .populate('usuario','nombre img')
            .populate('hospital','nombre img')


    res.json({
        ok: true,
        Medicos
    })
}

const crearMedico= async (req , res=response) =>{
    const { nombre } = req.body;
    const uid = req.uid;
    
    const medico = new Medico({
         usuario:uid,
        ...req.body
    })

    try { 
        const existeMedico = await Medico.findOne({nombre})

        if( existeMedico ){
            return res.status(400).json({
                ok: false,
                msg : "el medico ya esta registrado"
            })
        }

        const medicoDB =  await medico.save();

        res.json({
            ok: true,
            medico : medicoDB
        })
    } 
    
    catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Comuniquese con el administrador'
        })
    }

   
}

const actualizarMedico = async(req , res=response) =>{

    const id = req.params.id;
    const uid=req.uid;

    try {
        const medico = await Medico.findById(id);
        if(!medico){
            return res.status(404).json({
                ok:true,
                msg:'hospital no encontrado x ese id'
            })
        }

        const medicoActualizado = {
            ...req.body,
            usuario:uid
        }

        const nuevoMedico = await Medico.findByIdAndUpdate(id,medicoActualizado,{new : true})

        res.json({
            ok: true,
            medico : nuevoMedico
        })
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'consulte con el administrador'
        })
    }



 
}


const borrarMedico =async (req , res=response) =>{

    const id = req.params.id;

    try {
    
        const existeMedico = await Medico.findById(id);
        if(!existeMedico){
            return res.status(404).json({
                ok:false,
                msg:'no se encuentra ese id'
            })
        }

        await Medico.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg:'medico eliminado'
        })


    } catch (error) {
         res.status(500).json({
            ok:false,
            msg:'consulte con el administrador'
        })
    }



}

module.exports={
    getMedico,
    crearMedico,
    actualizarMedico,
    borrarMedico
}