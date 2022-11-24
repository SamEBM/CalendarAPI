const { Router } = require('express');
const { check } = require('express-validator');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { isDate } = require('../helpers/isDate');
const { fieldValidator } = require('../middlewares/field-validator');
const { jwtValidator } = require('../middlewares/jwt-validator');
const router = Router();

// Revisar que todas las peticiones tengan un token
router.use(jwtValidator);

router.get('/', getEvents);
router.post(
    '/', 
    [
        check('title', 'Title is required').notEmpty(),
        check('start', 'Start date is required').custom(isDate),
        check('end', 'End date is required').custom(isDate),
        fieldValidator
    ],
    createEvent
);
router.put(
    '/:id', 
    [
        check('title', 'Title is required').notEmpty(),
        check('start', 'Start date is required').custom(isDate),
        check('end', 'End date is required').custom(isDate),
        fieldValidator
    ],
    updateEvent
);
router.delete('/:id', deleteEvent);

module.exports = router;