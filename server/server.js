const http = require('http');
const fs = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer(function(req, res){
    let path = req.url; 
});

server.listen(port, hostname, () => {
    console.log("Sever running at http://"+hostname+":"+port+"/");
})

console.log("sever running on port 3000...")