const r = require('express').Router(); 
const c = require('../controllers/rentalController'); 

r.post('/', c.rentMovie); 
r.put('/return', c.returnMovie); // <--- Nova rota de devolução
r.get('/my', c.getMyRentals); 

module.exports = r;