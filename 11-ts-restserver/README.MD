# Notas


##  Como correr el proyecto usando Nodemon
Una manera de correr este proyecto de TS en Node es usando dos terminales distintas.

1. En una terminal correremos primero el comando `tsc --watch`.

2.  En otra terminal debemos correr nodemon apuntando a la carpeta dist del resultado de la transpilacion del TS. Se usa el siguiente comando: `nodemon dist/app`.

Con esto, al momento de guardar en un archivo en TS, `tsc --watch` transpilara el codigo a JS y actualizando la carpeta dist. Este movimiento hara reaccionar a `nodeamon dist/app` para volver a cargar el JS y actualizar el servidor.