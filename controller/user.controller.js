'use strict'

const User = require('../models/user.model');

function prueba(req, res){
    return res.send({message:'Todo va bien'})
}

module.exports = {
    prueba,
}