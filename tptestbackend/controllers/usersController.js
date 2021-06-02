const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/User');
const { generarJWT } = require('../helpers/jwt');
 
const crearUsuario = async(req, res = response ) => {

    const { email, password } = req.body;

    try {
        let usuario = await Usuario.findOne({ email });

        if ( usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe'
            });
        }

        usuario = new Usuario( req.body );
    
        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );
        
        usuario.isAdmin = false;

        await usuario.save();

        // Generar JWT
        const token = await generarJWT( usuario.id, usuario.username );
    
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            username: usuario.username,
            isAdmin: usuario.isAdmin,
            token
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}


const loginUsuario = async(req, res = response ) => {

    const { email, password } = req.body;

    try {
        
        const usuario = await Usuario.findOne({ email });

        if ( !usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese email'
            });
        }

        // Confirmar los passwords
        const validPassword = bcrypt.compareSync( password, usuario.password );

        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        }

        // Generar JWT
        const token = await generarJWT( usuario.id, usuario.username );

        res.json({
            ok: true,
            uid: usuario.id,
            username: usuario.username,
            isAdmin: usuario.isAdmin,
            token
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }

}


const revalidarToken = async (req, res = response ) => {

    const { uid, username } = req;

    // Generar JWT
    const token = await generarJWT( uid, username );

    res.json({
        ok: true,
        uid,
        token
    })
}




module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}