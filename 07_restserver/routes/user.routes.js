const { Router } = require('express');
const { check } = require('express-validator');


const { usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosDelete } = require('../controllers/user.controller');
const { esRolValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');


const { validarCampos, validarJWT, esAdminRole, tieneRol } = require('../middlewares')

// const { validarCampos } = require('../middlewares/validar-campos');
// const { validarJWT } = require('../middlewares/validar-jwt');
// const { esAdminRole, tieneRol } = require('../middlewares/validar-roles');

const router = Router();


router.get('/', usuariosGet);

router.post('/', [
    check('nombre', "El nombre es obligatorio").not().isEmpty(),
    check('password', "El password debe de ser mas de 6 letras").isLength({min:6}),
    check('correo', "El correo  no es valido").isEmail(),
    check('correo').custom( emailExiste ),
    // check('rol', "No es un rol valido").isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom( esRolValido ),
    validarCampos
], usuariosPost);

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom( esRolValido ),
    validarCampos
], usuariosPut);

router.patch('/', usuariosPatch);

router.delete('/:id', [
    validarJWT,
    // esAdminRole,
    tieneRol('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete);

module.exports = router;