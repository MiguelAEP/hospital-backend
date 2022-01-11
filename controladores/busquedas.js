//getTodo 

const { response } = require('express')
const Usuario = require('../models/usuario')
const Hospital = require('../models/hospital')
const Medico = require('../models/medico')

const getTodo = async(req , res=response ) =>{

        const parametro = req.params.parametro;

        //BUSCAR USUARIOS,Medicos y hospitales QUE CONCIDAN CON EL PARAMETRO DE BUSQUEDA
        //Como hacer para hacer una busqueda mas flexible

        const regex = new RegExp( parametro,'i');


        const [ usuarios ,medicos ,hospitales ]= await Promise.all([
        Usuario.find({nombre : regex}),
        Medico.find({nombre : regex}),
        Hospital.find({nombre : regex})
        ])

    try {
        console.log(parametro)

        res.status(200).json({
            ok:true,
            usuarios,
            medicos,
            hospitales
        })

    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Contacte al administrador'
        })
    }

}

const getDocumentosColeccion = async(req , res=response ) =>{

    const tabla = req.params.tabla;
    const parametro = req.params.parametro;

    //BUSCAR USUARIOS,Medicos y hospitales QUE CONCIDAN CON EL PARAMETRO DE BUSQUEDA
    //Como hacer para hacer una busqueda mas flexible

    const regex = new RegExp( parametro,'i');
    let data = [];

  
    switch (tabla) {
        case 'medicos':
            data = await Medico.find({nombre : regex})
            .populate('usuario','nombre img')
            .populate('hospital','nombre img')
        break;
        
        case 'hospitales':
            data = await Hospital.find({nombre : regex})
            .populate('usuario','nombre img')
        break;

        case 'usuarios':
             data = await Usuario.find({nombre : regex});
            
        break;
        default:
          return res.status(400).json({
                ok:false,
                msg:'la tabla tiene que ser usuarios/medicos/hospitales'
            })   
    }
    res.json({
        ok:true,
        resultados: data
    })

}

module.exports ={
    getTodo,
    getDocumentosColeccion
}