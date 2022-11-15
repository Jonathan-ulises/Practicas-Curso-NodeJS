const { response, request } = require("express");
const { Categoria } = require('../models')

// obtenerCategorias - paginado - total - populate
// obtenerCategoria - populate - {}
// actualizarCategoria
// borrarCategoria - estado : false

const obtenerCategorias = async(req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.params;
    const query = { estado: true };

    const [ total, categorias ] = await Promise.all([
        Categoria.countDocuments( query ),
        Categoria.find( query )
            .skip( Number(desde) )
            .limit( Number(limite) )
            .populate('usuario', 'nombre')
    ]);

    res.json({
        total,
        categorias
    })
}

const obtenerCategoria = async(req = request, res = response) => {
    const { id } = req.params;

    const categoria = await Categoria.findById(id).populate('usuario', 'nombre');

    if (!categoria) {
        res.status(400).json({
            msg: 'ID no encontrado'
        });
    }

    res.json(categoria)
}

const actualizarCategoria = async(req = request, res = response) => {
    const { id } = req.params;
    const  { nombre, estado, usuario , ...data } = req.body;

    data.nombre = nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true }).populate('usuario', 'nombre');

    res.json(categoria)

}

const borrarCategoria = async(req = request, res = response) => {
    const { id } = req.params;
    const categoia = await Categoria.findByIdAndUpdate(id, { estado: false }).populate('usuario', 'nombre');
    res.json({categoia})
}

const crearCategoria = async(req, res = response) => {

    const nombre = req.body.nombre.toUpperCase();
    const categoriaDB = await Categoria.findOne({ nombre });

    if ( categoriaDB ) {
        return res.status(400).json({
            msg: `La categoia ${categoriaDB.nombre}, ya existe`
        });
    }

    // Generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria( data );

    //Guardar DB
    await categoria.save();

    res.status(201).json(categoria)

}

module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria
}