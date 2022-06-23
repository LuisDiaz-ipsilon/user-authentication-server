const { Router } = require('express');
const { check } = require('express-validator');
const { newUser, logUs, renew } = require('../controllers/auth');
const { jwtValidate } = require('../middlewares/jwt-validator');
const { validate } = require('../middlewares/user-validator');

const router = Router();



//do create new user
router.post( '/new', [
        check('usname', 'El nombre es obligatorio y sin espacios').isAlpha(),
        check('usname', 'El username debe ser de 5 a 20 caracteres').isLength({min: 5, max: 20}),
        check('id', 'El id es obligatorio').isAlphanumeric(),
        check('pass', 'La contraseña es obligatoria').isAlphanumeric(),
        validate
    ], 
newUser);

//Loggin user
router.post( '/', [
        check('id', 'ID obligatorio').isAlphanumeric(),
        check('pass', 'Contraseña obligatoria').isAlphanumeric(),
        validate
    ], 
logUs);

//validate jwtoken
router.get( '/renew', jwtValidate,/* [
        check('id', 'ID obligatorio').isAlphanumeric(),
        check('usname', 'Contraseña obligatoria').isAlphanumeric()
    ], */
renew);

module.exports = router;
