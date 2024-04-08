'use strict'

const express = require('express');
const publicacion_Controller = require('../controller/publicacion.controller');
const api = express.Router();

api.get('/like', publicacion_Controller.dar_Like);//Funciona
api.put('/comentario', publicacion_Controller.agregar_Comentario);
api.put('/crear_Publicacion', publicacion_Controller.crear_Publicacion);//Funciona
api.get('/mostrar_Publicaciones', publicacion_Controller.mostrar_Publicaciones);//Funciona
api.get('/mostrar_Tendencias', publicacion_Controller.mostrar_Tendencias);//Funciona

//FUNCIONES DEL ADMINISTRADOR
api.put('/carga_Masiva',publicacion_Controller.carga_Masiva);//FUNCIONA
api.put('/eliminar_Publicacion/:id', publicacion_Controller.eliminar_Publicacion);//Funciona
api.get('/publicacion_Unica/:id', publicacion_Controller.mostrar_Publicacion_Unico);//Funciona
api.post('/publicacion_CSV', publicacion_Controller.publicacion_CSV);//Funciona

module.exports = api;