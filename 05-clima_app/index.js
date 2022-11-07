require('dotenv').config()
const colors = require('colors');


const { inquirerMenu, pausa, leerInput, listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

const main = async() => {
    
    const busquedas = new Busquedas();
    let opt;

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                const lugar = await leerInput('Ciudad:')
                const lugares = await busquedas.ciudad(lugar)
                const id = await listarLugares( lugares );

                if ( id === '0') continue;
                
                const lugarSel = lugares.find(l => l.id === id);
                
                busquedas.agregarHistorial( lugarSel.nombre );

                const clima = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng);

                // Mostrar resultados
                console.clear()
                console.log('\nInformacion de la ciudad\n'.green);
                console.log('Ciudad', colors.magenta(lugarSel.nombre));
                console.log('Lat:', lugarSel.lat);
                console.log('Lng:', lugarSel.lng);
                console.log('Temperature:', clima.temp);
                console.log('Minimia:', clima.min);
                console.log('Maximca:', clima.max);
                console.log('Como esta el clima:', colors.cyan(clima.desc));
                
                break;
            case 2:
                busquedas.historialCapitalizado.forEach( (lugar, i) => {
                    console.log(`${ colors.green(i + 1) }. ${ lugar } `)
                })
                break;
            default:
                break;
        }

        if ( opt !== 0 ) await pausa();
        
    } while( opt !== 0)
}

main();