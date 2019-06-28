const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('../db');
const port = 3000;
const cors = require('CORS');
//middleware
app.use(express.static('dist'));
app.use(bodyParser.json());
app.use(cors());


app.post('/todos', (req, res) =>{
    // req.body will be from form from client
    console.log('server', req.body); //send as obj still
    db.newTodo(req.body, (err, sent) => {
        if(err) {
            console.log(err);
        }else{
            db.getTodos((err, results) => {
                if(err) {
                    console.log(err);
                }else{
                    res.send(results);
                }
            })
        }
    })
})

app.get('/todos', (req, res) => {
    db.getTodos((err, suc) => {
        if(err){
            console.log(err);
        }else{
            console.log(suc);
            res.send(suc);
        }
    })
})


app.listen(port, () => console.log(`shenanigans have started on aisle ${port}`));