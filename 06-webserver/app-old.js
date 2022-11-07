const http = require('http');

http.createServer((req, res) => {
    console.log(req)
    // res.write('Hola mundo'); // escribir respuesta
    // res.end(); // terminar respuesta

    // res.setHeader('Content-Disposiion', 'attachment; filename=lista.csv')
    // res.writeHead(200, { 'Content-Type': 'application/csv' });

    res.write('Hola mundo')
    // res.write('1, Jona\n')
    // res.write('2, Ara\n')
    // res.write('3, Luis\n')
    // res.write('404 | Page not Found')
    res.end();
})
.listen( 8080 );

console.log('Escuchando el puerto', 8080)
