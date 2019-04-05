module.exports = function(app) {

    var atendimentos = require('../controllers/atendimento.controller.js');

    // Create a new Atendimento
    app.post('/api/atendimentos', atendimentos.create);

    // Retrieve all Atendimento
    app.get('/api/atendimentos', atendimentos.findAll);

    // Retrieve a single Atendimento by Id
    app.get('/api/atendimentos/:id', atendimentos.findOne);

    // Delete a Atendimento with Id
    app.delete('/api/atendimentos/:id', atendimentos.delete);
}
