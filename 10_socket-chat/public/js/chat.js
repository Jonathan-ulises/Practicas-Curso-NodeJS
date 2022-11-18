// REFERENCIAS HTML
const txtUid = document.querySelector('#txtUid')
const txtMensaje = document.querySelector('#txtMensaje')
const ulUsuarios = document.querySelector('#ulUsuarios')
const ulMensajes = document.querySelector('#ulMensajes')
const btnSalir = document.querySelector('#btnSalir')
const ulPrivados = document.querySelector('#ulPrivados')


let usuario = null;
let socket = null;

const validarJWT = async () => {
    const token = localStorage.getItem('token') || '';
    if (token.length <= 10) {
        window.location = 'index.html';
        throw new Error('No hay token en el seridor')
    }

    const resp = await fetch('http://localhost:8080/api/auth/', {
        headers: { 'x-token': token }
    });

    const { usuario: userDB, token: tokenDB } = await resp.json();
    localStorage.setItem('token', tokenDB)
    usuario = userDB;
    document.title = usuario.nombre

    await conectarSocket();
}

const conectarSocket = async () => {
    socket = io({
        'extraHeaders': {
            'x-token': localStorage.getItem('token')
        }
    });

    socket.on('connect', () => {
        console.log('Sockets Online')
    });

    socket.on('disconnect', () => {
        console.log('Sockets Offline')
    });

    socket.on('recibir-mensajes', dibujarMensajes);

    socket.on('usuarios-activos', dibujarUsuarios);

    socket.on('mensaje-privado', dibujarMensajesPrivados);
}

const dibujarUsuarios = (usuarios = []) => {
    let usertHTML = '';
    usuarios.forEach(({ uid, nombre }) => {
        usertHTML += `
            <div class="card text-bg-success mb-3" style="max-width: 18rem;">
                <div class="card-header">${ nombre }</div>
                <div class="card-body">
                    <h5 class="card-title">${ uid }</h5>
                </div>
            </div>
        `;


    });

    ulUsuarios.innerHTML = usertHTML
}

const dibujarMensajes = (mensajes = []) => {
    let mensajesHTML = '';
    mensajes.forEach(({ nombre, mensaje }) => {
        mensajesHTML += `
        <div class="card text-bg-primary mb-3" style="max-width: 18rem;">
            <div class="card-header">${nombre} </div>
            <div class="card-body">
              <p class="card-text">${mensaje}</p>
            </div>
        </div>`
    });

    ulMensajes.innerHTML = mensajesHTML
}

const dibujarMensajesPrivados = ({de, mensaje}) => {
    let mensajesHTML = '';
    
    mensajesHTML += `
    <div class="card text-bg-dark mb-3" style="max-width: 18rem;">
        <div class="card-header">${de} </div>
        <div class="card-body">
            <h5 class="card-title"></h5>
            <p class="card-text">${mensaje}</p>
        </div>
    </div>`
    
    console.log(mensajesHTML)

    ulPrivados.innerHTML = mensajesHTML
}

txtMensaje.addEventListener('keyup', ({ keyCode }) => {
    const mensaje = txtMensaje.value;
    const uid = txtUid.value;

    if (keyCode !== 13) { return; }
    if (mensaje.length === 0) { return; }

    socket.emit('enviar-mensaje', { mensaje, uid });

    txtMensaje.value = ''
})

const main = async () => {

    //validar JWT
    await validarJWT();

}

main();
