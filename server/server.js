const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('../db');
const port = 3000;
const cors = require('CORS');
//middleware
app.use(express.static('dist'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());


app.post('/', (req, res) =>{
    // req.body will be from form from client
    console.log('test'); 
    db.newTodo({messages:'testing'}, (err, sent) => {
        if(err) {
            console.log(err);
        }else{
            res.send(sent);
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