const { Router } = require('express');
const { check } = require('express-validator');

const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias.controller');
const { existeCategoria } = require('../helpers/db-validators');
const { validarJWT, esAdminRole } = require('../middlewares');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

// Obtener todas las categorias - publico
router.get('/', obtenerCategorias);

// Obtener una categoria por id - publico
router.get('/:id',[
    check('id', "No es un ID valido").isMongoId(),
    check('id').custom( existeCategoria ),
    validarCampos
], obtenerCategoria );

// Crear categoria - privado (cualquier rol y token valido)
router.post('/', [ 
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
 ], crearCategoria );

// Actualizar categoria - privado (cualquier rol y token valido)
router.put('/:id', [
    validarJWT,
    check('id', "No es un ID valido").isMongoId(),
    check('id').custom( existeCategoria ),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], actualizarCategoria );

// Borrar (logico) categoria - privado (ADMIN y token valido)
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    validarCampos
] ,borrarCategoria);


module.exports = router;