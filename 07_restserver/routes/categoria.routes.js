const { Router } = require('express');
const { check } = require('express-validator');

const { crearCategoria, obtenerCategorias } = require('../controllers/categorias.controller');
const { validarJWT } = require('../middlewares');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

// Obtener todas las categorias - publico
router.get('/', obtenerCategorias);

// Obtener una categoria por id - publico
router.get('/:id',[
    // check('id').custom( existeCategoria )
], (req, res) => {
    res.json('get:id')
});

// Crear categoria - privado (cualquier rol y token valido)
router.post('/', [ 
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
 ], crearCategoria );

// Actualizar categoria - privado (cualquier rol y token valido)
router.put('/:id', (req, res) => {
    res.json('put')
});

// Borrar (logico) categoria - privado (ADMIN y token valido)
router.delete('/:id', (req, res) => {
    res.json('delete')
});


module.exports = router;