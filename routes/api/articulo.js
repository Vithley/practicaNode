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


        const filtro = {};

        if(name){
            filtro.name = name;
        }

        if(price) {
            filtro.price = price;
        }

        
        const articulos = await Articulos.lista(filtro, skip, limit, fields, sort); 
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