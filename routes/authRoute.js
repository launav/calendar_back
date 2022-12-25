const { Router } = require('express');
const { check } = require('express-validator');//nos va a hacer chequeos
const { createUser, loginUser, renewToken } = require('../controllers/authControllers');
const { validateInputs } = require('../middleware/validarInputs');
const { validateJWT } = require('../middleware/validateJWT');
const router = Router();


//REGISTRO 
router.post('/new', [
    //aquí se pueden enviar los middleware
    check('name', 'Debes escribir el nombre').not().isEmpty(),
    check('email', 'Debes escribir un email correcto').isEmail(),
    check('password', 'La contraseña debe tener entre  6 y 10 caracteres').isLength({ min: 6, max: 10 }),
    validateInputs//aqui se puede hacer un matches y cualquier expresion regular que nosotros queramos
    //CUARTO MIDDLEWARE
    //SE PONE AL FINAL PORQ VA A COMPROBAR EL CHECK UNO POR UNO
], createUser);

//LOGIN
router.post('/', [
    check('email', 'Debes escribir un email correcto').isEmail(),
    check('password', 'La contraseña debe tener entre  6 y 10 caracteres').isLength({ min: 6, max: 10 }),
    validateInputs
], loginUser);

//RENEW JSON WEBTOKEN JWT
router.get('/renew', validateJWT, renewToken);


module.exports = router;