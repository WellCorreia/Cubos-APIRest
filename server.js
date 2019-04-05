var express = require("express");
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json())
 
require('./app/routes/atendimento.routes.js')(app);


var server = app.listen(3000, () => {
 console.log("Server running on port 3000");
});


//var atendimentos = require('../controllers/atendimento.controller.js')

//
//app.get("/getAll", (req, res, next) => {
//
//  var fs = require('fs');
//
//  fs.readFile('db.json', function (err, data) {
//    var json = JSON.parse(data);
//    res.json(json);
//    // fs.writeFile("db.json", JSON.stringify(json));
//  });
//});
//
//
//
//app.post("/create", (req, res, next) => {
//
//  var hours = [
//    {
//      start: "10:40",
//      end: "11:00"
//    },
//    {
//      start: "11:40",
//      end: "12:00"
//    }
//  ];
//
//  var registro = {
//    id: 1,
//    day: "03-04-2019",
//    intervals: hours
//  }
//  
//  
//  //var json = JSON.parse(registro);
//  res.json(registro);
//
//  var fs = require('fs');
//  fs.readFile('db.json', function (err, data) {
//    fs.writeFile("db.json", JSON.stringify(registro))
//  });
//
//});
//
//app.delete("/delete/:regraId", (req, res, next) => {
// res.json(["Tony","Lisa","Michael","Ginger","Food"]);
//});
