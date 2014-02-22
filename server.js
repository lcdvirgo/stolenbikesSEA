var connect = require('connect');
connect.createServer(
    connect.static('/web/sites/sea.bike')
).listen(80);

