'use strict'
const express = require('express');
const reportes_Controller = require('../controller/reportes.controller');
const api = express.Router();

api.get('/top_5_PostS_Likes', reportes_Controller.top_5_Likes);
api.get('/cantidad_Posts_Categoria', reportes_Controller.cantidad_Posts_Categoria);
api.get('/top_10_Usuarios_Publicaciones', reportes_Controller.top_10_usuarios);

module.exports = api;