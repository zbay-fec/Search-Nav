
const mysql = require('mysql');


const con = mysql.createConnection({
    host: "remotemysql.com",
    user: "UT7mgfISwy",
    password: "1l1tfSX5oP",
    database: "UT7mgfISwy"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected database!");
  });

//going to get names for each item.
//going to move all names to react array in order to filter for autofilling functionality
  const findAllNames = (cb) => {
    console.log('oi');
                            //placeholder //put in .escape(user) format instead of ${}
    con.query(`Select items.name from items`, (err, results) => {
        if(err) cb(err);
        cb(null, results);
    }) 
  }

  const getSpecificName = (user, cb) => {
                            //placeholder
    con.query(`select * from items where items.name='${user.username}' `, (err, results) => {
        if(err) cb(err);
        cb(null, results);
    })
  }


module.exports = { findAllNames, getSpecificName };