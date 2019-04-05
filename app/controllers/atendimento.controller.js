
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
    // res.end("Post Successfully: \n" + JSON.stringify(newAtendimento, null, 4));
};

exports.findAll = function(req, res) {
    var fs = require('fs');

    fs.readFile('db.json', function (err, data) {
        var json = JSON.parse(data);
        res.json(json);


				var startDate = "02-10-2019";
        var endDate = "06-10-2019";



				function isBigEnough(value) {
				  return value >= 10;
				}
				json.filter(isBigEnough);
				console.log(filtered);

				var resultProductData = json.filter(function (a) {
            var hitDates = a.ProductHits || {};
            // extract all date strings
            hitDates = Object.keys(hitDates);
            // convert strings to Date objcts
            hitDates = hitDates.map(function(date) { return new Date(date); });
            // filter this dates by startDate and endDate
            var hitDateMatches = hitDates.filter(function(date) { return date >= startDate && date <= endDate });
            // if there is more than 0 results keep it. if 0 then filter it away
            return hitDateMatches.length>0;
        });

				//res.json(resultProductData);
    });

//    res.end("All atendimentos: \n" + JSON.stringify(atendimentos, null, 4));
};

exports.findOne = function(req, res) {

    var fs = require('fs');

    fs.readFile('db.json', function (err, data) {
        var json = JSON.parse(data);

				var startDate = "02-10-2019";
        var endDate = "06-10-2019";
				var resultProductData = json.filter(function (a) {
            var hitDates = a.ProductHits || {};
            // extract all date strings
            hitDates = Object.keys(hitDates);
            // convert strings to Date objcts
            hitDates = hitDates.map(function(date) { return new Date(date); });
            // filter this dates by startDate and endDate
            var hitDateMatches = hitDates.filter(function(date) { return date >= startDate && date <= endDate });
            // if there is more than 0 results keep it. if 0 then filter it away
            return hitDateMatches.length>0;
        });








        var atendimento = json["atendimento" + req.params.id];
        res.end( "Find a Atendimento:\n" + JSON.stringify(atendimento, null, 4));
    });
};

exports.delete = function(req, res) {
  var deleteAtendimento = atendimentos["atendimento" + req.params.id];
    delete atendimentos["atendimento" + req.params.id];
    console.log("--->After deletion, atendimento list:\n" + JSON.stringify(atendimentos, null, 4) );
    res.end( "Deleted atendimento: \n" + JSON.stringify(deleteAtendimento, null, 4));
};
