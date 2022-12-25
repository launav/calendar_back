//!IMPORTAMOS EL MODELO
const User = require('../models/UserModel');
//!IMPORTAMOS PARA ENCRYPTAR LAS CONTRASEÑAS
const bcrypt = require('bcryptjs');
const { JWTgenerator } = require('../helpers/jsw');


//*CREATE USER
const createUser = async (req, res) => {

    const { email, password } = req.body;
    // console.log(req.body)

    try {

        //?VALIDAR QUE EL USUARIO NO EXITE
        let usuario = await User.findOne({ email });

        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya está registrado'
            });
        };

        usuario = new User(req.body);

        //?ENCRYPTAR LA CONTRASEÑA
        const salt = bcrypt.genSaltSync();//si no le pasas argumentos tiene una long de 10|salt es un num aleatorio

        usuario.password = bcrypt.hashSync(password, salt);
        // console.log(usuario.password)


        //?SUBIR EL USUARIO A LA BBDD
        await usuario.save();

        //?CREAR EL TOKEN
        const token = await JWTgenerator(usuario.id, usuario.name);

        //DEVOLVEMOS LA RESPUESTA
        return res.status(201).json({
            ok: true,
            msg: 'Registrando',
            token
            // user: 
        });

    } catch (error) {
        // console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Contacta con el administrador'
        });
    };


};


//*LOGIN USER
const loginUser = async (req, res) => {

    // console.log('req.body', req.body);

    const { email, password } = req.body;

    try {
        const usuario = await User.findOne({ email });

        //comprobamos que no existe el usuarop
        if (!usuario) {
            res.status(400).json({
                ok: false,
                msg: 'El usuario con ese email no existe'
            });
        };

        //comprobamos que no existe la contraseña

        const passwordOk = bcrypt.compareSync(password, usuario.password);

        if (!passwordOk) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta'
            });
        };

        //generamos jwt
        const token = await JWTgenerator(usuario.id, usuario.name);

        const user = {
            name: usuario.name,
            email: usuario.email,
            uid: usuario._id
        };

        return res.status(200).json({
            ok: true,
            msg: 'Usuario logeado',
            user,
            token
        });

    } catch {
        // console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Contacta con el administrador'
        });
    };
};


//*RENEW TOKEN
const renewToken = async (req, res) => {
    // console.log(req)

    const { uid, name } = req;

    const token = await JWTgenerator(uid, name);

    res.json({
        ok: true,
        msg: 'renew token',
        user: { uid, name },
        token
    });
};


module.exports = {
    createUser,
    loginUser,
    renewToken
}