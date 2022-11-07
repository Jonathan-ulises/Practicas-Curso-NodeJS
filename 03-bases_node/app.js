const { crearArchivo } = require('./helpers/multiplicar');
require('colors');
// * MEJOR FORMA DE TRAER DATOS DE TERMINAL (YARGS)
const argv = require('./config/yargs')

console.clear()

// process.argv trae los argumentos que son ingresados por terminal
// ! NO SE USA ESTA FORMA
// const [,,arg3 = 'base=5'] = process.argv;
// const [,base = 5] = arg3.split('=');



crearArchivo( argv.b, argv.l, argv.h )
    .then( nombreArchivo => console.log(nombreArchivo.rainbow, 'creado (async)'.green))
    .catch( err => console.error(err))