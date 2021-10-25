const http = require('http');
const url = require("url");
const StringDecoder = require("string_decoder").StringDecoder;
const util = require("util");

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer(function(req, res){
    let path = url.parse(req.url, true);
    
    res.writeHead(200);
    res.write(util.inspect(path.query)+"\n\n");
    res.end('End of message');
});

server.listen(port, hostname, () => {
    console.log("Sever running at http://"+hostname+":"+port+"/");
})

console.log("sever running on port 3000...")