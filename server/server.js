const express = require('express');
const db = require('../db');
const path = require('path');
const cors = require('cors');
const app = express();

app.use('/static', express.static(path.join(__dirname, 'dist')));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    //then query on change of the input box
    db.findAllNames((err, suc) => {
        if(err) console.log(err);
        res.send(suc);
    })
})

app.post('/', (req, res) => {
    //posting when clicking the item in the autofilling recommended
    db.getSpecificName({username: req.body.name}, (err, results) => {
        if(err) console.log('ERRRRR', err);
        res.send(results);
    })
})


app.listen(3000, ()=> console.log(`shenanigans have started on aisle 3000`));
