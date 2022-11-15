const { Router } = require('express');
const { check } = require('express-validator');
const { crearProducto, obtenerProductos, obtenerProducto, actualizarProducto, borrarProducto } = require('../controllers/productos.controller');
const { existeProducto } = require('../helpers/db-validators');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const router = Router();

router.get('/', obtenerProductos )

router.get('/:id', [
    check('id', 'El ID es obligatorio').not().isEmpty(),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
],obtenerProducto)

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('_idCategoria', 'El ID de la categoria es obligatorio').not().isEmpty(),
    check('_idCategoria', 'No es un ID valido').isMongoId(),
    validarCampos
], crearProducto)

router.put('/:id', [
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeProducto ),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('_idCategoria', 'El ID de la categoria es obligatorio').not().isEmpty(),
    check('_idCategoria', 'No es un ID valido').isMongoId(),
    validarCampos
], actualizarProducto)

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    validarCampos   
], borrarProducto)


module.exports = router;