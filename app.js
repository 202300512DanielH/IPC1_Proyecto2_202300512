'use strict'
// EL USE STRICT: el modo estricto impone ciertas restricciones y mejoras al lenguaje para ayudar a prevenir errores comunes.

const express = require('express'); //Se obtiene la aplicacion de express para que funcione como una api

/* body-parser: es un middleware de Express que se utiliza para analizar los cuerpos 
    de las solicitudes entrantes en un formato que Express pueda entender, como JSON.
    Esta instancia de la aplicación será la base sobre la cual construiremos nuestra 
    aplicación (API).
*/
const bodyParser = require('body-parser');
// ------------------------------
//EN eSTA SECCION SE HARAN LOS IMPORTS DE LAS ROUTAS QUE TENDRAN LAS PETICIONES HTTP
const user_Route = require('./routes/user.routes');
const publicacion_Route = require('./routes/publicaciones.routes');
//
const app = express(); // Me brinda una instancia de la aplicacion EXPRESS

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	res.header('Allow', 'GET, POST, PUT, DELETE');
	next();
});

app.use('/user', user_Route);
app.use('/publicacion', publicacion_Route);

module.exports = app;