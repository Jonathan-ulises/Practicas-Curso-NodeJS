const express = require('express')
const fileUpload = require('express-fileupload');
const cors = require('cors');

const { dbConnection } = require('../database/config.db');


class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            buscar: '/api/buscar',
            categorias: '/api/categorias',
            productos: '/api/productos',
            usuarios: '/api/usuarios',
            uploads: '/api/uploads'
        }


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
        this.app.use(express.json())

        // Directorio publico
        this.app.use(express.static('public'))

        // FileUpload - carga de archivos
        // Note that this option available for versions 1.0.0 and newer. 
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));
    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/auth.routes'));
        this.app.use(this.paths.buscar, require('../routes/bucar.routes'));
        this.app.use(this.paths.categorias, require('../routes/categoria.routes'));
        this.app.use(this.paths.productos, require('../routes/productos.routes'));
        this.app.use(this.paths.usuarios, require('../routes/user.routes'));
        this.app.use(this.paths.uploads, require('../routes/uploads.routes'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor correiendo en puerto', this.port)
        })
    }
}

module.exports = Server;