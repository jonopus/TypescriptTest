var http = require("http")
var fs = require("fs")
var path = require('path')
http.createServer(function (request, response) {
    var filePath;
    switch(true) {
        case request.url == "/":
        case request.url == "/index.htm":
        case request.url == "/index.html": {
            filePath = "/index.html";
            break;

        }
        default: {
            filePath = request.url;

        }
    }
    var contentType;
    switch(path.extname(filePath)) {
        case '.js': {
            contentType = 'text/javascript';
            break;

        }
        case '.css': {
            contentType = 'text/css';
            break;

        }
        default: {
            contentType = 'text/html';
            break;

        }
    }
    filePath = __dirname + "/../../public" + filePath;
    fs.exists(filePath, function (exists) {
        if(exists) {
            fs.readFile(filePath, function (error, content) {
                if(error) {
                    response.writeHead(500);
                    response.end("500");
                } else {
                    response.writeHead(200, {
                        'Content-Type': contentType
                    });
                    response.end(content, 'utf-8');
                }
            });
        } else {
            response.writeHead(404);
            response.end();
        }
    });
}).listen(1337, '127.0.0.1');

