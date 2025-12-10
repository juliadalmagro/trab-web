const r = require('express').Router(); 
const c = require('../controllers/movieController'); 

r.get('/', c.getAll); 
r.post('/', c.create); 
r.put('/:id', c.update); // Rota de Edição
r.delete('/:id', c.delete); // Rota de Remoção

module.exports = r;