const express = require('express');
const db = require('../db');
const cors = require('cors');
const parser = require('body-parser');
const compression = require("compression");
const app = express();
const port = process.env.PORT || 3001;
const overwatch = require('overwatch-api'); //testing for mobile app

app.use(express.static("dist"));
app.use(express.json());
app.use(parser.json({ strict: false }));
app.use(cors());
app.use(compression());


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
    // console.log(req.body, "oiiiiii");
    //posting when clicking the item in the autofilling recommended
    db.getSpecificItem({username: req.body.name}, (err, results) => {
        if(err) console.log('ERRRRR', err);
        res.send(results);
    })
})

//app api call test s
app.get('/overwatch', (req, res) => {
    console.log(req.body);
    const platform = req.body.platform;
    const region = req.body.region;
    const tag = req.body.username;
    
    overwatch.getProfile(platform, region, tag, (err, results) => {
        if (err) console.error(err);
        else {
            console.log(results);
            res.send(results);
        }
    });

})


app.listen(port, ()=> console.log(`shenanigans have started on aisle ${port}`));