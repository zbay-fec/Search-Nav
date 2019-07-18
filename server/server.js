const express = require('express');
const db = require('../db');
const path = require('path');
const cors = require('cors');
const parser = require('body-parser');
const app = express();

const port = process.env.PORT || 3001;
const host = process.env.HOST || "0.0.0.0";

app.use(express.static("dist"));
app.use(express.json());
app.use(cors());
app.use(parser.json({ strict: false }));


app.get('/items', (req, res) => {
    //then query on change of the input box
    db.findAllNames((err, suc) => {
        if(err) console.log(err);
        console.log(suc, "SERVER");
        // const data = suc.map((val) => {
        //     val.name.toLowerCase();
        // })
        const results = [];
        for(let i=0; i<suc.length; i++){
            results.push(suc[i].name.toLowerCase());
        }
        console.log(results , "should be lower case");
        res.send(results);
    })
})

app.post('/find', (req, res) => {
    console.log(req.body)
    //posting when clicking the item in the autofilling recommended
    db.getSpecificName({username: req.body.name}, (err, results) => {
        if(err) console.log('ERRRRR', err);
        res.send(results);
    })
})


app.listen(port, ()=> console.log(`shenanigans have started on aisle ${port}`));
