const { response, request } = require("express");
const { Producto } = require("../models");


const crearProducto = async(req, res = response) => {
    const { nombre, precio, _idCategoria, descripcion, disponible } = req.body;    
    const data = {
        nombre: nombre.toUpperCase(),
        precio,
        descripcion,
        disponible,
        usuario: req.usuario._id,
        categoria: _idCategoria
    };
    const producto = await Producto(data);

    await producto.save();

    res.status(201).json(producto)
}

const obtenerProductos = async(req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.param;
    const query = { estado: true };

    const [ total, productos ] = await Promise.all([
        Producto.countDocuments( query ),
        Producto.find( query )
            .populate('categoria', 'nombre')
            .populate('usuario', 'nombre')
            .skip( Number( desde ) )
            .limit( Number( limite ) )
    ]);

    res.json({
        total,
        productos
    })
}

const obtenerProducto = async(req = request, res = response) => {
    const { id } = req.params;
    const producto = await Producto.findById(id).populate('categoria', 'nombre').populate('usuario', 'nombre');

    if (!producto) {
        res.json(400).json({
            msg: 'ID no encontrado'
        });
    }

    res.json(producto)
}

const actualizarProducto = async(req, res = response) => {
    const { id } = req.params;
    const { nombre, usuario, estado, ...data } = req.body;    

    data.nombre = nombre.toUpperCase();
    data.usuario = req.usuario._id;
    data.categoria = data._idCategoria;

    const producto = await Producto.findByIdAndUpdate(id, data, { new: true }).populate('usuario', 'nombre').populate('categoria', 'nombre');

    res.json(producto)
}

const borrarProducto = async(req = request, res = response) => {
    const { id } = req.params;
    const producto = await Producto.findByIdAndUpdate(id, { estado: false }).populate('usuario', 'nombre').populate('categoria', 'nombre')
    res.json({producto})
}

module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto
}