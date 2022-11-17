const TicketControl = require("../models/ticket-control");

const ticketCotrol = new TicketControl();


const socketController = (socket) => {

    // Cuando un cliente se conecta
    socket.emit('ultimo-ticket', ticketCotrol.ultimo )
    socket.emit('estado-actual', ticketCotrol.ultimos4)
    socket.emit('tickets-pendientes', { pendientes: ticketCotrol.tickets.length})

    socket.on('siguiente-ticket', ( payload, callback ) => {
        const siguiente = ticketCotrol.siguiente();
        callback( siguiente )

        // TODO: Notificar que  hay un nuevo ticket pendiende de asignar
        socket.broadcast.emit('tickets-pendientes', { pendientes: ticketCotrol.tickets.length})
    });

    socket.on('atender-ticket', ({ escritorio }, callback) => {
        if ( !escritorio ) {
            return callback({
                ok: false,
                msg: 'El escritorio es obligatorio'
            });
        }

        const ticket = ticketCotrol.atenderTicket( escritorio );

        // TODO: NOTIFICAR CAMBIO ENE LOS ULTIMOS 4
        socket.broadcast.emit('estado-actual', ticketCotrol.ultimos4)
        socket.broadcast.emit('tickets-pendientes', { pendientes: ticketCotrol.tickets.length} )


        if ( !ticket ) {
            callback({
                ok: false,
                msg: 'Ya no hay tickets pendientes'
            })
        } else {
            callback({
                ok: true,
                ticket,
                pendientes: ticketCotrol.tickets.length
            })
        }
    })

}



module.exports = {
    socketController
}

