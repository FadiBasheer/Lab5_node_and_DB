// var express = require('express');
// var cors = require('cors');
// var app = express();
// var mysql = require('mysql');
// app.use(express.json());
// app.use(cors());

// // host: "us-cdbr-east-05.cleardb.net",
// // user: "b0b98d543d137a",
// // password: "2f6898a3",
// // database: "heroku_63f3d100f3621d1"

// var con = mysql.createConnection({
//     // host: "localhost",
//     // user: "root",
//     // password: "",
//     // database: "lab5_4537"

//     host: "us-cdbr-east-05.cleardb.net",
//     user: "b0b98d543d137a",
//     password: "2f6898a3",
//     database: "heroku_63f3d100f3621d1"

// });

// con.connect(function (err) {
//     if (err) throw err;
//     console.log("Connected!");
// });


// app.post('/', (request, response) => {

//     const name = request.body.name;

//     const score = request.body.score;

//     var sql = `INSERT INTO score (name, score) VALUES ("${name}", "${score}")`;
//     con.query(sql, function (err, result) {
//         if (err) {
//             response.sendStatus(404);
//         } else {
//             response.send(`${name}:${score} was stored in the DB`);
//         }
//     });

// });

// app.listen(3004);




var express = require('express');
var cors = require('cors');
var app = express();
var mysql = require('mysql');
app.use(express.json());
var PORT = 8000;

app.use((req, res, next) => {
    res.header(
        "Access-Control-Allow-Origin", "*"
    );
    next();
});

var con = mysql.createPool({
    connectionLimit: 50,
    host: "us-cdbr-east-05.cleardb.net",
    user: "b0b98d543d137a",
    password: "2f6898a3",
    database: "heroku_63f3d100f3621d1"
});

app.get('/', function (request, response) {
    con.getConnection(function (error, tempCont) {
        if (error) {
            tempCont.release();
            response.sendStatus(404);
        } else {
            tempCont.query('SELECT * FROM score', function (error, results) {
                tempCont.release();
                if (error) {
                    response.sendStatus(404);
                } else {
                    response.send(results);
                }
            });
        }
    });

});


app.post('/', (request, response) => {

    const name = request.body.name;

    const score = request.body.score;

    con.getConnection(function (error, tempCont) {
        if (error) {
            tempCont.release();
            response.sendStatus(404);
        } else {
            var sql = `INSERT INTO score (name, score) VALUES ("${name}", "${score}")`;
            tempCont.query(sql, function (err, result) {
                tempCont.release();
                if (err) {
                    response.sendStatus(404);
                } else {
                    response.send(`${name}:${score} was stored in the DB`);
                }
            });
        }
    });
});

app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});