const { Socket } = require("socket.io");
const { comprobarJWT } = require("../helpers");
const { ChatMensajes } = require('../models')

const chatMensajes = new ChatMensajes();

//LA IGUALACION DEL NEW SOCKET NO SE DEBE DE HACER EN PRODUCCION, ES PARA TENER TIPADO EN DESARROLLO
const socketController = async (socket = new Socket(), io) => {
    const token = socket.handshake.headers['x-token']
    const usuario = await comprobarJWT(token);
    if (!usuario) {
        console.log('SocketController', 'Error De validacion de JWT')
        return socket.disconnect();
    }

    // Agregar al usuario cconectado
    chatMensajes.conectarUsuario(usuario)
    io.emit('usuarios-activos', chatMensajes.usuaiosArr)
    socket.emit('recibir-mensajes', chatMensajes.ultimos10)

    // Coneectar el cliente a una sala especial
    socket.join(usuario.id); // global, socket.id, usuario.id

    // Limpiar cuando se desconecta
    socket.on('disconnect', () => {
        chatMensajes.desconectarUsuario(usuario.id)
        io.emit('usuarios-activos', chatMensajes.usuaiosArr)

    });

    socket.on('enviar-mensaje', ({ uid, mensaje }) => {

        if ( uid ) {
            // Mensaje primado
            socket.to( uid ).emit('mensaje-privado', { de: usuario.nombre, mensaje })
        } else {
            // Mensaje global
            chatMensajes.enviarMensaje( usuario.id, usuario.nombre, mensaje )
            io.emit('recibir-mensajes', chatMensajes.ultimos10)
        }

    });
}

module.exports = {
    socketController
}