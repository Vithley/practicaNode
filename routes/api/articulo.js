'use stric';

const express = require('express');
const router = express.Router();
const Articulos = require('../../models/Articulos');

// GET/api/articulo
// Devuelve una lista de artículos
router.get('/', async (req, res, next) => {
   
       
    // Filtros
    const name = req.query.name;
    const price = req.query.precio;
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

    if(tags) {
        filter.tags = tags;
    }

    if(forSale) {
        filter.forSale = forSale;
    }

    if(price) {
        if (price.substring(0, 1) === '-') {
        
        price = price.substring(1);
        

        filter.price = { '$lt': price }; // 
        }
        else if (price.substring(price.length-1, price.length) === '-') { // Precio negativo
        

            price = price.substring(0,precio.length-1);
            filter.price = { '$gt': price};
        }
        else if (price.includes('-')) // Rango de precios
        {
            var precioInicio = price.substring(0, precio.indexOf('-'));
            var precioFin = price.substring(precio.indexOf('-') + 1, price.length);
            

            filter.price = { '$gt': precioInicio, '$lt': precioFin };
        }
        else { // Precio exacto
            console.log('Precio exacto');

            filter.price= price;
        }
    }
    
    // Sólo metemos el nombre en el filtro 
    if (name) { 
        filter.name = new RegExp('^' + nombre, 'i');
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

// Borrar un anuncio a través de la API
router.delete('/:id', function (req, res, next) {

    const id = req.params.id;
    Articulos.remove({_id: id}, function (err) {
        if (err) {
            return next(err);
        }
        res.json({success: true});
    });
});

// Obtener lista de tags
router.get('/tags', function (req, res, next) {

    const tags = req.query.tags;

    // Filtros. Originalmente está vacío
    const filter = {};

    // Sólo metemos el nombre en el filtro si viene informado
    if (tags) {
        filter.tags = tags;
    }

    Articulos.lista(filter, null, null, function (err, tags) {
        if (err) {
            res.json({sucess: false, error: err});
            return;
        }
        res.json({sucess: true, data: tags});
    });
});




module.exports = router;