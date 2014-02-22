var express = require('express'),
    http = require('http'),
    path = require('path'),
    ElastiSearchClient = require('elasticsearchclient');


var port = 80;

var app = express();
app.use(express.bodyParser()); // Look up warning

//var file_serving_dir = path.join(__dirname, '/public/');
var file_serving_dir = './public/';
app.use(express.static(file_serving_dir));

app.post('/api/reports', function(req, res) {
    console.log(req.body);

});

app.get('/add-report', function(req, res) {
    res.sendfile(file_serving_dir + 'report-form.html');
});

app.get('/maps', function(req, res) {
    res.sendfile(file_serving_dir + 'maps.html');
});

app.get('/', function(req, res) {
    res.sendfile(file_serving_dir + 'index.html');
});

http.createServer(app).listen(port, function () {
    console.log('Express server listening on port: ' + port);
});
