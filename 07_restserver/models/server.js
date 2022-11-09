const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config.db');


class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';

        // Conectar a base de datos
        this.conectarDb();

        // Middleware - funcionnes que extienden la funcionalidad del la aplicacion
        this.middlewares();

        //Rutas de la aplicacion;
        this.routes();
    }

    async conectarDb() {
        await dbConnection();
    }

    middlewares() {
        // CORS
        this.app.use(cors())

        // Parseo y lectura del body
        this.app.use( express.json() )

        // Directorio publico
        this.app.use( express.static('public') )
    }

    routes() {
        this.app.use(this.authPath, require('../routes/auth.routes'))
        this.app.use(this.usuariosPath, require('../routes/user.routes'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor correiendo en puerto', this.port)
        })
    }
}

module.exports = Server;