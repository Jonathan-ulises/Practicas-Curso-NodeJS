const Tarea = require("./tarea");
const colors = require('colors');

class Tareas {
    _listado = {}

    get listadoArr() {
        const listado = []
        Object.keys(this._listado).forEach( key => {
            listado.push(this._listado[key])
        })
        return listado;
    }

    constructor() {
        this._listado = {};
    }

    borrarTarea( id = '') {
        if (this._listado[id]) {
            delete this._listado[id]
        }
    }

    crearTarea( desc = '') {
        const tarea = new Tarea( desc );

        this._listado[tarea.id] = tarea
    }

    cargarTareasFromArray( tareas = [] ) {
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        })
    }

    listadoCompleto() {
        let listadoCom = "\n";
        this.listadoArr.forEach((tarea, index) => {
            listadoCom += (`${ colors.green(index+1 + '.' )}. ${tarea.desc} :: ${ tarea.completadoEn ? 'Completada'.green : 'Pendiente'.red}\n`)
        })
        return listadoCom;
    }

    listarPendientesCompletadas( completadas = true ) {
        let listTareas = "\n";

        this.listadoArr
            .filter(t => (completadas) ? t.completadoEn !== null  : t.completadoEn === null)
                .forEach((tarea, index) => {
                    listTareas += (`${ colors.green(index+1 + '.') } ${tarea.desc} :: ${ tarea.completadoEn ? tarea.completadoEn.green : 'Pendiente'.red}\n`)
                });

        return listTareas;
    }

    toggleCompletadas( ids = [] ) {
        ids.forEach( id => {
            const tarea = this._listado[id]
            if ( !tarea.completadoEn ) {
                tarea.completadoEn = new Date().toISOString()
            }
        });

        this.listadoArr.forEach(tarea => {
            if ( !ids.includes(tarea.id) ) {
               this._listado[tarea.id].completadoEn = null;
            }
        });
    }
}

module.exports = Tareas;