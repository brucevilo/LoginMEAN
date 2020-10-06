var express = require('express');
var app = express();
var port = process.env.PORT ||8000;
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var router = express.Router();
var appRoutes = require('./apps/Routes/api')(router);
var path = require('path');

app.use(morgan('dev'));
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded
app.use(express.static(__dirname+'/public'));
app.use('/api',appRoutes);
var mongoConnectionString = 'mongodb://localhost/test';

mongoose.connect(mongoConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.once('open', function () {
    console.log('connection has been made');
}).on('error', function (error) {
    console.log('error is'.error);
});

app.get('*',function(req,res){
    res.sendFile(path.join(__dirname+'/public/app/views/index.html'));
});

app.listen(port, function () {
    console.log("running this server " + port);
});