
exports.create = function(req, res) {
    var newAtendimento = req.body;
		var json = [];
		var nome = "atendimentos"
    var fs = require('fs');
		fs.readFile('db.json', function (err, data, bytes) {
			if(data != ""){
				json = JSON.parse(data);
				json["atendimentos"].push(newAtendimento);
			}else{
				json = {
					atendimentos:[newAtendimento]
				}
				res.json(json);
			}
    	fs.writeFile("db.json", JSON.stringify(json, null, 4));
		});
};

exports.findAll = function(req, res) {
    var fs = require('fs');

    fs.readFile('db.json', function (err, data) {
        var json = JSON.parse(data);
        res.json(json);
    });
};

exports.findOne = function(req, res) {

    var fs = require('fs');

    fs.readFile('db.json', function (err, data) {
        var json = JSON.parse(data);

        var startDate = new Date(req.params.firstDate.split('-').reverse().join('-'));
        var endDate = new Date(req.params.lastDate.split('-').reverse().join('-'));

        var atendimentoFiltrado = json['atendimentos'].filter(function (a) {
            a.day = new Date(a.day.split('-').reverse().join('-')) || {};
            if (a.day >= startDate && a.day <= endDate) {
              return a;
            }
          });
        res.json(atendimentoFiltrado);
    });
};

exports.delete = function(req, res) {

  var fs = require('fs');
  var newAtendimentos = [];
  fs.readFile('db.json', function (err, data, bytes) {
    var json = JSON.parse(data);
    console.log(json);
    newAtendimentos = {
      atendimentos: json['atendimentos'].filter(function (a) {if (a.day != req.params.date) {return a;}})
    }
  	fs.writeFile("db.json", JSON.stringify(newAtendimentos, null, 4));
  });

};
