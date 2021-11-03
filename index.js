import express from 'express';
import fetch from 'node-fetch';

import usersRoutes from './routes/users.js';

const app = express();
const PORT = 8000;

const adzuna = {
    "app_id": 'c0093c93',
    "app_key": '11f94de775c812f68753112bde143110'
}

let query = `https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=${adzuna.app_id}&app_key=${adzuna.app_key}`;

const response = await fetch(query);
const body = await response.text();

console.log(body);

app.use('/users', usersRoutes);

app.get('/', (req, res) =>{
    res.send('Hello from homepage!');
});

app.listen(PORT, () => console.log(`Sever running on port: http://localhost:${PORT}`));