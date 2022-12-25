const { Router } = require('express');
const { check } = require('express-validator');
const { isDate } = require('../helpers/isDate');

const { deleteEvent, updateEvents, createEvent, getEvents } = require('../controllers/calendarControllers');
const { validateInputs } = require('../middleware/validarInputs');
const { validateJWT } = require('../middleware/validateJWT');
const router = Router();

router.use(validateJWT);//cuando queremos que un middleware sea valido para todas las rutas

//RECOGER LOS EVENTOS
//VALIDAR LOS INPUTS DEL FRONT -> INPUT DEL TITLE, DEL DESCRIPTION, START Y END
router.get('/', getEvents);

//CREAR UN EVENTO
router.post('/', [
    check('title', "Debes escribir el título").not().isEmpty(),
    check('start', "Debes indicar la fecha de inicio").custom(isDate),
    check('end', "Debes indicar la fecha de finalización").custom(isDate),
    validateInputs
], createEvent);

//ACTUALIZAR UN EVENTO
router.put('/:id', [
    check('title', "Debes escribir el título").not().isEmpty(),
    check('start', "Debes indicar la fecha de inicio").custom(isDate),
    check('end', "Debes indicar la fecha de finalización").custom(isDate),
    validateInputs
], updateEvents);

//ELIMINAR UN EVENTO
router.delete('/:id', deleteEvent);


module.exports = router;