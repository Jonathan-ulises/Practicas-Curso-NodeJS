"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const usuario_routes_1 = __importDefault(require("../routes/usuario.routes"));
class Server {
    constructor() {
        this.apiPaths = {
            usuarios: '/api/usuarios'
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '8000';
        // Metodos iniciales
        this.middlewares();
        // Definir mis rutas
        this.routes();
    }
    // TODO: CONECTAR  BASE DE DATOS
    middlewares() {
        // CORS
        this.app.use((0, cors_1.default)());
        // Lectura del  body
        this.app.use(express_1.default.json());
        // Carpeta publica
        this.app.use(express_1.default.static('public'));
    }
    routes() {
        this.app.use(this.apiPaths.usuarios, usuario_routes_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto:', this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map