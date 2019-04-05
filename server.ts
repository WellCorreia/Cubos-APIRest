var express = require("express");
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json())

require('./app/routes/atendimento.routes.ts')(app);

var server = app.listen(3000, () => {
 console.log("Server running on port 3000");
});
