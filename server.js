var express = require('express'),
    http = require('http'),
    path = require('path'),
    Geocodio = require('geocodio'),
    ElasticSearchClient = require('elasticsearchclient');

var serverOptions = {
    host: '107.170.73.13',
//    host: 'localhost',
    port: 9200
};

var geocodio = new Geocodio({ api_key: '667915937c113a907395335035a501656590a79'});

var elasticSearchClient = new ElasticSearchClient(serverOptions);

var port = 3000;

var app = express();
app.use(express.bodyParser()); // Look up warning

//var file_serving_dir = path.join(__dirname, '/public/');
var file_serving_dir = './public/';
app.use(express.static(file_serving_dir));

app.post('/api/reports', function(req, res) {
    var reportData = req.body;
    geocodio.geocode(req.body.address, function(err, response) {
        if (!err) {
            var geoCordinates = response.results[0].response.results[0].location;
            reportData.latitude = geoCordinates.lat;
            reportData.longitude = geoCordinates.lng;
        }
        elasticSearchClient.index('seabike', 'report', req.body)
            .on('data', function(data) {
                return res.send('Report added!');
            })
            .exec();
    });
});

app.get('/api/reports', function(req, res) {
    elasticSearchClient.search('seabike', '', { size: 2000 })
        .on('data', function(data) {
            return res.send(JSON.parse(data));
        })
        .exec();
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
