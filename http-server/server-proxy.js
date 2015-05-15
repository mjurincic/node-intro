var http = require('http');

http.createServer(function(request, response) {

    var options = {
        host: 'localhost',
        port: 9000,
        path: request.url,
        method: request.method,
        headers: request.headers
    };
    var proxyRequest = http.request(options);
    proxyRequest.on('response', function(proxyResponse) {
        proxyResponse.pipe(response);
    });
    request.pipe(proxyRequest);
}).listen(8080);

http.createServer(function(req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    res.write('request successfully proxied to port 9000!' + '\n' + JSON.stringify(req.headers, true, 2));
    res.end();
}).listen(9000);
