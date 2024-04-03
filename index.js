'use strict'
const app = require('./app');
const user_Controller = require('./controller/user.controller');
const port = 3200; //SE ASIGNA UN PUERTO EN EL CUAL RECIBIRA TODAS LAS SOLICITUDES

app.listen(port, () => {
    user_Controller.crear_Admin();
    console.log('El servidor de Node JS esta funcionando con el puerto ' + port);
})