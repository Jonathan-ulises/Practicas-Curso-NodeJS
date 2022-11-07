// Son funciones que se mandan como argumento a otra funcion

const getUsuarioByID = ( id, callback ) => {
    const usuario = {
        id,
        nombre: 'Jonathan'
    }
    
    setTimeout(() => {
        callback(usuario)
    }, 1500)
}

getUsuarioByID(10, ({nombre}) => {
    console.log(`Hola ${nombre.toUpperCase()}`)
});