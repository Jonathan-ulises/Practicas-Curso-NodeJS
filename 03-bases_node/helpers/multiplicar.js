const fs = require('fs'); // importacion de recursos
require('colors');

// metodo async de multiplicacion
const crearArchivo = async(base = 5, listar, hasta = 10) => {
    try {
        let salidaTerminal = '';
        let salidaTxt = ''

        for (let i = 1; i <= hasta; i++) {
            salidaTerminal += (`${base} x ${i} = ${base * i}\n`.magenta);
            salidaTxt += (`${base} x ${i} = ${base * i}\n`)
        }
    
        if ( listar ) {
            console.log('======================'.italic.brightCyan)
            console.log('   TABLA DEL:'.italic.brightCyan, base)
            console.log('======================'.italic.brightCyan)
            console.log(salidaTerminal)
        }
    
        fs.writeFileSync(`./salida/tabla-${base}.txt`, salidaTxt);
        return `Tabla-${base}.txt`
    } catch(error) {
        throw error
    }
}

// EXPORTACION DE RECURSOS
module.exports = {
    crearArchivo
}