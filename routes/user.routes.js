const express = require('express');
const user_Controller = require('../controller/user.controller');
//CREO UNA INSTANCIA CON LA CUAL PODRE MANEJAR LAS PETICIONES POR MEDIO DE RUTAS
const api = express.Router(); 

//La ruta para acceder a esta solicitud es "localhost:3200/prueba"
api.get('/prueba', user_Controller.prueba);//Funciona

//Funciones para cualquier tipo de usuario
api.post('/registrarse', user_Controller.registrar_Usuario);//Funciona
api.post('/iniciar_Sesion', user_Controller.iniciar_Sesion);//Funciona
api.put('/actualizar_Usuario/:id', user_Controller.actualizar_Usuario)//Funciona

//Funciones para el administrador
api.get('/listar_Usuarios', user_Controller.listar_Usuarios);//Funciona
api.put('/eliminar_Usuario/:id', user_Controller.eliminar_Usuario);//Funciona

module.exports = api;
