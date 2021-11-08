import express from 'express';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 8000;
const router = express.Router();

const adzuna = {
    "app_id": 'c0093c93',
    "app_key": '11f94de775c812f68753112bde143110'
}

let options = {
    dotfiles: "ignore",
    etag: true,
    extensions: ["htm", "html"],
    index: false,
    maxAge: "7d",
    redirect: false,
    setHeaders: function(res, path, stat){
        res.set("x-timestamp", Date.now());
    }
};

app.use(express.static("public", options))
let query = `https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=${adzuna.app_id}&app_key=${adzuna.app_key}&&content-type=application/jso`;

const response = await fetch(query);
const body = await response.text();

app.get('/action', (req, res) =>{
    let json = JSON.parse(body);
    let response;
    for(let i = 0; i < json['results'].length; i ++){
        let lat = json['results'][i]["latitude"];
        if(lat >= parseInt(req.query.minlat) && lat <= parseInt(req.query.maxlat)){
            response += ('<h1>'+json['results'][i]["latitude"] + '</h1>');
        }
    }
    res.send(response);
});

app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname+'/views/index.html'));
});


app.listen(PORT, () => console.log(`Sever running on port: http://localhost:${PORT}`));