const jwt = require('jsonwebtoken');

const JWTgenerator = (uid, name) => {

    return new Promise((resolve, reject) => {
        const payload = { uid, name };

        jwt.sign(
            payload,
            process.env.JWT_SECRET_KEY,
            { expiresIn: '3h' },
            (error, token) => {
                if (error) {
                    // console.log(error);
                    reject('Error al generar el token');//return implicito
                };
                resolve(token);
            }
        );

    });

};

module.exports = {
    JWTgenerator
}
