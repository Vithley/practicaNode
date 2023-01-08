'use strict';

const mongoose = require('mongoose');

//Definir el esquema de los artículos
const articuloSchema = mongoose.Schema({
    name: {type:String, index: true},
    estado: {type:Boolean, index: true},
    precio: {type:Number, index: true},
    imagen: String,
    tags: {type:[String], index: true}

});


// Crear el modelo
const Articulo = mongoose.model('Articulo', articuloSchema);


// Exportar el modelo
module.exports = Articulo;