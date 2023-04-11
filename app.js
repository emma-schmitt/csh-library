const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());


app.get('/page/:pgnumber', (req, res) => {
    const pgnumber = req.params.pgnumber;
    res.sendFile(__dirname + `/assets/photos/pg${pgnumber}.jpg`);
});


app.get('/pages', (req, res) => {
    const pages = '30';
    res.send(pages);
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/html/index.html');
});

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.listen(8080, () => {
    console.log('Server listening on port 3000');
});
