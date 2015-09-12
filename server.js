// Required Module for a serving http files
var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');


//Array of mime types


var mimeTypes = {
	"html" : "text/html",
	"jpge" : "image/jpge",
	"jpg"  : "image/jpg",
	"png" : "image/png",
	 "js ": "text/javascript",
	 "css" : "text/css"

}; 


//create server

http.createServer(function(req,res){

	var uri = url.parse(req.url).pathname;
	var fileName = path.join(process.cwd(),unescape(uri));
	console.log("loading.."+uri);
	var stats;


	try{

		stats = fs.lstatSync(fileName);

	}catch (e){

		res.writeHead(404,{'Content-type' : 'text/plain'});
		res.write('404 not found');                            //this code sends a 404 error if no file is found
		res.end();
		return;
	}

                      // check if it is a file or a directory

      if(stats.isFile()){

      	var mimeType = mimeTypes[path.extname(fileName).split(".").reverse()[0]];  //this line of code will give us the mime type of the file
      	res.writeHead(200,{'Content-type':mimeType});

      	var fileStream  = fs.createReadStream(fileName);
      	fileStream.pipe(res);

    }else if (stats.isDirectory()){
                res.writeHead(302,{'Location' : 'index.html'});
                res.end();

    }else {
    	res.writeHead(500,{'Content-type':'text/plain'});
    	res.write('500 Internal error');
    	res.end();

    }
}).listen(3000);