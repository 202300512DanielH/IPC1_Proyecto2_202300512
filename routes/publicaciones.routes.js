'use strict'

const express = require('express');
const publicacion_Controller = require('../controller/publicacion.controller');
const api = express.Router();

api.get('/like', publicacion_Controller.dar_Like);//Funciona
api.put('/comentario', publicacion_Controller.agregar_Comentario);
api.put('/crear_Publicacion', publicacion_Controller.crear_Publicacion);//Funciona
api.get('/mostrar_Publicaciones', publicacion_Controller.mostrar_Publicaciones);//Funciona
api.get('/mostrar_Tendencias', publicacion_Controller.mostrar_Tendencias)

module.exports = api;