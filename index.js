'use strict'
const app = require('./app');
const port = 3200; //SE ASIGNA UN PUERTO EN EL CUAL RECIBIRA TODAS LAS SOLICITUDES

app.listen(port, () => {
    console.log('El servidor de Node JS esta funcionando con el puerto ' + port);
})