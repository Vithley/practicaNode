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

articuloSchema.statics.lista = function(filter, skip, limit, fields, sort) {
    const query = Articulo.find(filter);
    query.skip(skip);
    query.limit(limit);
    query.select(fields);
    query.sort(sort);
    return query.exec();
}


// Crear el modelo
const Articulo = mongoose.model('Articulo', articuloSchema);


// Exportar el modelo
module.exports = Articulo;