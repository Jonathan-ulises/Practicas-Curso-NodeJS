const { Router } = require('express');
const { buscar } = require('../controllers/buscar.conroller');

const router = Router();

router.get('/:coleccion/:termino', buscar)

module.exports = router;