const { validationResult } = require("express-validator");


const validateInputs = (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()//metodo que mapea los errores
        })
    }

    next();//continua ejecutando la llamada a la función
};

module.exports = {
    validateInputs
}