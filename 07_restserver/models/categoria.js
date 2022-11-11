const { Schema, model } = require('mongoose');

const CategoriaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        require: true
    },
    usuario: {
        //Referencia con otra collection
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true
    },
})

CategoriaSchema.methods.toJSON = function() {
    const { __v, _id, ...categoria } = this.toObject();
    categoria.cid = _id;
    return categoria;
}

module.exports = model('Categoria', CategoriaSchema)
