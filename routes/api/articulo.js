'use stric';

const express = require('express');
const router = express.Router();
const Articulos = require('../../models/Articulos');

// GET/api/articulo
// Devuelve una lista de artículos
router.get('/', async (req, res, next) => {
    try {

        // Filtros
        const name = req.query.name;
        const precio = req.query.precio;
        const forSale = req.query.estado;
        const tags = req.query.tags;

        //Paginación
        const skip = req.query.skip;
        const limit = parseInt(req.query.limit);


        // Selección de campos
        const fields = req.query.fields;

        // Ordenación
        const sort = req.query.sort;


        const filter = {};

        if(typeof name !== 'undefined') {
            filter.name = new RegExp('^' + req.query.nombre, "i");
        }

        if(typeof precio !== 'undefined') {
            var maxMin = precio.split("-");
    
            if( maxMin.length === 1 && maxMin[0] !== '' && !isNaN(maxMin[0]) ){
                filter.precio = maxMin[0];
            }else{
                var min = maxMin[0];
                var max = maxMin[1];
    
                if( min === '' && !isNaN(max)) {
                    filter.precio = {$lt: max };
                }else if( max === '' && !isNaN(min)) {
                    filter.precio = {$gt: min };
                } else {
                    if( !isNaN(min) && !isNaN(max) ){
                        filter.precio = {$gt: min, $lt: max};
                    }
    
                }
            }
    
        }

        if(typeof tags !== 'undefined') {
            if( tags.constructor === Array) {
                filter.tags = { $in : tags };
            }else{
                filter.tags = { $in : [ tags ] };
            }
        }
    
        if(typeof forSale !== 'undefined'){
            filter.forSale = forSale;
        }

        const articulos = await Articulos.lista(filter, skip, limit, fields, sort); 
        res.json({ results : articulos });

    } catch(err) {
        next(err);
    }
});


// POST /api/articulo
//Crear un articulo
router.post('/', async (req, res, next) => {
    try {

        const artData = req.body;

        //Instanciar un nuevo artículo en memoria
        const articulo = new Articulos(artData);

        //Lo guardo en la base de datos
        const artSave = await articulo.save();

        res.json( {result: artSave} );




    } catch (err) {
        next(err);
    }
});



module.exports = router;