module.exports = function(app) {

    var atendimentos = require('../controllers/atendimento.controller.ts');

    // Cria um novo Atendimento
    app.post('/api/atendimentos', atendimentos.create);

    // Retorna todos os Atendimento
    app.get('/api/atendimentos', atendimentos.findAll);

    // Consulta por datas
    app.get('/api/atendimentos/:firstDate/:lastDate', atendimentos.findOne);

    // Deleta por Data
    app.delete('/api/atendimentos/:date', atendimentos.delete);
}
