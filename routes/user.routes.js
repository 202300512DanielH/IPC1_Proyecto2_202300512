const express = require('express');
const user_Controller = require('../controller/user.controller');
//CREO UNA INSTANCIA CON LA CUAL PODRE MANEJAR LAS PETICIONES POR MEDIO DE RUTAS
const api = express.Router(); 

//La ruta para acceder a esta solicitud es "localhost:3200/prueba"
api.get('/prueba', user_Controller.prueba);

//Funciones para cualquier tipo de usuario



//Funciones para el administrador

module.exports = api;
