'use stric';

const express = require('express');
const router = express.Router();
const Articulos = require('../../models/Articulos');

// GET/api/articulo
// Devuelve una lista de artículos
router.get('/', async (req, res, next) => {
    try {
       
        const articulos = await Articulos.find(); 
        res.json({ results : articulos });

    } catch(err) {
        next(err);
    }
});

module.exports = router;