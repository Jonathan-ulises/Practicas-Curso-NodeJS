const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn, renovarToken } = require('../controllers/auth.controller');
const { validarJWT, validarCampos } = require('../middlewares');

const router = Router();

router.post('/login', [
    check('correo', 'El  correo es obligatorio').isEmail(),
    check('password', 'La cotraseña es obligatoria').not().isEmpty(),
    validarCampos
], login);

router.post('/google', [
    check('id_token', 'Token de google es necesario').not().isEmpty(),
    validarCampos
], googleSignIn);

router.get('/', validarJWT, renovarToken )

module.exports = router;