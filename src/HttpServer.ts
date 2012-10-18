///<reference path='./node.d.ts'/>

import http = module("http");
import fs = module("fs");
import path = module('path');

http.createServer(function (request, response) {
	console.log("request.url", request.url);
    
    var filePath:string;
	switch(true){
    	case request.url == "/":
    	case request.url == "/index.htm":
        case request.url == "/index.html":
    		filePath = "/index.html";
	   		console.log("filePath", filePath);
            break;
        default:
            filePath = request.url;
    }
         
    var contentType:string;
    switch (path.extname(filePath)) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        default:
            contentType = 'text/html';
            break;
    }
    
	filePath = __dirname + "/../public" + filePath;

    console.log("contentType", contentType);
    console.log("filePath", filePath);

    fs.exists(filePath, function(exists) {
     
        if (exists) {
            fs.readFile(filePath, function(error, content) {
                if (error) {
                	console.log("error", error.message);
                    response.writeHead(500);
                    response.end("500");
                }
                else {
                    response.writeHead(200, { 'Content-Type': contentType });
                    response.end(content, 'utf-8');
                }
            });
        }
        else {
            response.writeHead(404);
            response.end();
        }
    });

    
}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');