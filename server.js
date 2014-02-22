var express = require('express'),
    http = require('http'),
    ElastiSearchClient = require('elasticsearchclient');


var port = 3000;

var app = express();
app.use(express.bodyParser()); // Look up warning


app.post('/api/reports', function(req, res) {

});

app.get('/add-report', function(req, res) {
    res.sendfile('report-form.html');
});

app.get('*', function(req, res) {
    res.sendfile('maps.html');
});

http.createServer(app).listen(port, function () {
    console.log('Express server listening on port: ' + port);
});