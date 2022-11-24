const { Router } = require('express');
const { check } = require('express-validator');
const { createUser, login, renewToken } = require('../controllers/auth');
const { fieldValidator } = require('../middlewares/field-validator');
const { jwtValidator } = require('../middlewares/jwt-validator');
const router = Router();

router.post(
    '/register', 
    [
        check('name', 'Name is required').notEmpty(),
        check('email', 'Invalid email').isEmail(),
        check('password', 'Password must have at least 6 characters').isLength({min: 6}),
        fieldValidator
    ], 
    createUser
);
router.post(
    '/login', 
    [
        check('email', 'Invalid email').isEmail(),
        check('password', 'Password must have at least 6 characters').isLength({min: 6}),
        fieldValidator
    ], 
    login
);
router.get('/token', jwtValidator, renewToken);

module.exports = router;