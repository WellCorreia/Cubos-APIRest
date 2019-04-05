
var atendimentos = {
        atendimentos: [
					{
					id: 1,
					day: "02-10-2019",
					intervals: [
					    {
					        start: "12:40",
					        end: "13:00"
					    },
					    {
					        start: "14:40",
					        end: "15:00"
					    }
					]
        },
        {
					id: 3,
					day: "04-10-2019",
					intervals: [
							{
									start: "12:40",
									end: "13:00"
							},
							{
									start: "14:40",
									end: "15:00"
							}
					]
        },
        {
					id: 5,
					day: "06-10-2019",
					intervals: [
							{
									start: "12:40",
									end: "13:00"
							},
							{
									start: "14:40",
									end: "15:00"
							}
					]
        },
        {
					id: 7,
					day: "08-10-2019",
					intervals: [
							{
									start: "12:40",
									end: "13:00"
							},
							{
									start: "14:40",
									end: "15:00"
							}
					]
        }
			]
		}

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
            //console.log(a.day);
            if (a.day >= startDate && a.day <= endDate) {
              return a;
            }
          });
        res.json(atendimentoFiltrado);
    });
};

exports.delete = function(req, res) {
  var deleteAtendimento = atendimentos["atendimento" + req.params.id];
    delete atendimentos["atendimento" + req.params.id];
    console.log("--->After deletion, atendimento list:\n" + JSON.stringify(atendimentos, null, 4) );
    res.end( "Deleted atendimento: \n" + JSON.stringify(deleteAtendimento, null, 4));
};
