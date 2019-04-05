
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
    	fs.writeFile("db.json", JSON.stringify(json, null, 4),{}, () => {
         fs.close(5, () => {});
      });
		});
};

exports.createWeek = function(req, res) {
    var newAtendimento = req.body;
		var json = [];
    var datafim;
    var dateString = newAtendimento.day;
    var count = 0;
    var fs = require('fs');

    var date1 = new Date(dateString);
    var date = (date1.getFullYear()+'-'+date1.getDate()+'-0'+date1.getMonth());//Date((date1.getMonth()+1)+'-'+date1.getDate()+'-'+date1.getFullYear());
    date = new Date(date);

		fs.readFile('db.json', function (err, data, bytes) {

      for(let i = 0; i < 7; i++){
        date.setDate(date.getDate() + 1);
        if(date.getDate() < 10){
            datafim = (('0'+date.getDate())+'-'+(date.getMonth()+1)+'-'+date.getFullYear());
        }else{
            datafim = ((date.getDate())+'-'+(date.getMonth()+1)+'-'+date.getFullYear());
        }
        newAtendimento.day = datafim;
        console.log(datafim)
        if(json != "" && json != null){
          if(data != "" ){
            if(count == 0){
              json = JSON.parse(data);
              count++;
            }
  				}
          json.atendimentos.push({...newAtendimento});
  			}else{
  				json = {
  					atendimentos:[{...newAtendimento}]
  				}
  			}
      }
      res.json(json);
      fs.writeFile("db.json", JSON.stringify(json, null, 4),{}, () => {
        fs.close(5, () => {});
      });
		});
};

exports.createDay = function(req, res) {
    var newAtendimento = req.body;
		var json = [];
    var datafim;
    var dateString = newAtendimento.day;
    var count = 0;
    var fs = require('fs');

    var date1 = new Date(dateString);
    var date = (date1.getFullYear()+'-'+date1.getDate()+'-0'+date1.getMonth());//Date((date1.getMonth()+1)+'-'+date1.getDate()+'-'+date1.getFullYear());
    date = new Date(date);

		fs.readFile('db.json', function (err, data, bytes) {
      for(let i = 0; i < req.params.qtd; i++){
        date.setDate(date.getDate() + 1);
        if(date.getDate() < 10){
            datafim = (('0'+date.getDate())+'-'+(date.getMonth()+1)+'-'+date.getFullYear());
        }else{
            datafim = ((date.getDate())+'-'+(date.getMonth()+1)+'-'+date.getFullYear());
        }

        newAtendimento.day = datafim;

        if(json != "" && json != null){
          if(data != "" ){
            if(count == 0){
              json = JSON.parse(data);
              count++;
            }
  				}
          console.log(newAtendimento)
          json.atendimentos.push({...newAtendimento});
  			}else{
          json = {
  					atendimentos:[{...newAtendimento}]
  				}
  			}
      }
      res.json(json);
      //console.log(json)
      fs.writeFile("db.json", JSON.stringify(json, null, 4),{}, () => {
        fs.close(5, () => {});
      });
		});
};

exports.findAll = function(req, res) {
    var fs = require('fs');

    fs.readFile('db.json', function (err, data) {
        var json = JSON.parse(data);
        res.json(json);
    });
};

exports.find = function(req, res) {

    var fs = require('fs');

    fs.readFile('db.json', function (err, data) {
        var json = JSON.parse(data);

        var startDate = new Date(req.params.firstDate.split('-').reverse().join('-'));
        var endDate = new Date(req.params.lastDate.split('-').reverse().join('-'));

        var atendimentoFiltrado = json['atendimentos'].filter(function (a) {
            a.day = new Date(a.day.split('-').reverse().join('-')) || {};
            if (a.day >= startDate && a.day <= endDate) {
              a.day = (a.day.getDate()+1)+'-'+(a.day.getMonth()+1)+'-'+a.day.getFullYear();
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
