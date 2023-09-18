const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const dotenv = require('dotenv');
const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(express.json());
app.use(cors());
let result = dotenv.config();
console.log("result", result);
console.log("env variables", process.env);

const port = process.env.PORT || '8081';

// Database Connection
const dbConnection = require('./dbconfig.js');
// Shows Mysql Connect
dbConnection.connect((err) =>{
if(err) throw err;
console.log('Mysql Connected with App...');
});



/*const dbConnection = mysql.createConnection({
    host: mysqlHost,
    port: mysqlPort,
    user: mysqlUser,
    password: mysqlPass,
    database: mysqlDb
})*/


app.get("/", (req, res) => {
    const sql = "SELECT * FROM Student;"
    dbConnection.query(sql, (err, data) => {
        if(err) return res.json("Error")
        return res.json(data);
    })
});

app.post('/create',  async (req, res) => {
    const sql = "INSERT INTO Student (Name, Email) VALUES (?, ?);";
    const name = req.body.name
    const email = req.body.email
    
    dbConnection.query(sql, [name, email], (err, data) => {
        if (err) return res.json("Error");
        return res.json(data);

    })
})



app.put('/update/:id',  async (req, res) => {
    const sql = "UPDATE Student SET Name = ?, Email = ? WHERE ID = ?";
    const name = req.body.name
    const email = req.body.email
    const id = req.params.id;
    
    dbConnection.query(sql, [name, email, id], (err, data) => {
        if (err) return res.json("Error");
        return res.json(data);

    })
})


app.delete('/student/:id',  async (req, res) => {
    const sql = "DELETE FROM Student WHERE ID = ?"
    const id = req.params.id;
    
    dbConnection.query(sql, [id], (err, data) => {
        if (err) return res.json("Error");
        return res.json(data);

    })
})

app.listen(port, () => {
    console.log("listening");
})
