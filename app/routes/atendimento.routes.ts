module.exports = function(app) {

    var atendimentos = require('../controllers/atendimento.controller.ts');

    // Cria um novo Atendimento
    app.post('/api/atendimentos', atendimentos.create);

    // Cria um novo Atendimento Semanal
    app.post('/api/atendimentos/semanal', atendimentos.createWeek);

    // Cria um novo Atendimento Diario
    app.post('/api/atendimentos/diario/:qtd', atendimentos.createDay);

    // Retorna todos os Atendimento
    app.get('/api/atendimentos', atendimentos.findAll);

    // Consulta por datas
    app.get('/api/atendimentos/:firstDate/:lastDate', atendimentos.find);

    // Deleta por Data
    app.delete('/api/atendimentos/:date', atendimentos.delete);
}
