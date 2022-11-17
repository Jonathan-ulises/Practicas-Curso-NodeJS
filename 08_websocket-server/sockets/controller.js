

const socketController = (socket) => {
    console.log('Cliente conectado', socket.id)
    socket.on('disconnect', () => {
        // console.log('Cliente desconectado')
    });

    socket.on( 'enviar-mensaje', async( payload, callback ) => {

        const id = 123456;
        callback({ id, fecha: new Date().getTime() })

        // console.log(payload)
        socket.broadcast.emit('enviar-mensaje', payload );
    });
}

module.exports = {
    socketController
}
