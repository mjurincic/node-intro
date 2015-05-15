var http = require('http');
var fs = require('fs');

http.createServer(function(request, response) {
    var newFile = fs.createWriteStream("uploaded.png");
    var fileBytes = request.headers['content-length'];
    var uploadedBytes = 0;
    response.writeHead(200, {
        'content-type': 'text/html'
    });
    request.on('readable', function() {
        var chunk = null;
        while (null !== (chunk = request.read())) {
            uploadedBytes += chunk.length;
            var progress = (uploadedBytes / fileBytes) * 100;
            response.write("progress: " + parseInt(progress, 10) + "%\n");
        }
    });

    request.pipe(newFile);

    request.on('end', function() {
        response.end(
            '<form action="/upload" enctype="multipart/form-data" method="post">' +
            '<input type="text" name="title"><br>' +
            '<input type="file" name="upload" multiple="multiple"><br>' +
            '<input type="submit" value="Upload">' +
            '</form>'
        );
    });
}).listen(8080);
console.log('Listening on port 8080...');