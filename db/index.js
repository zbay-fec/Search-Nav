const mysql = require('mysql');

const con = mysql.createConnection({
    host: "remotemysql.com",
    user: "Vwof08H2lK",
    password: "oScxiVLZNb",
    database: "Vwof08H2lK"
  });
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

  const newTodo = function(todo, cb){
    con.query(`insert into messages (messages) values ('${todo.messages}')`, function(err, results){
        if(err) cb(err);
        cb(null, results);
    })
  }

  const getTodos = function(cb){
      con.query(`select messages.messages from messages`, function(err, results){
          if(err) cb(err);
          cb(null, results);
      })
  }

module.exports = { newTodo, getTodos };