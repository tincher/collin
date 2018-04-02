var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/';
var cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));
app.use(cors());

app.listen(3000, () => console.log('Collin listening on port 3000!'));

app.get('/test', (req, res) => {
    res.send('test successfull');
});

app.post('/add', (req, res) => {
    insertOneInDB(req.body);
    res.send('succesfull');
});

app.get('/getAll', (req, res) => {
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        var collindb = db.db('collindb').collection('collin');
        collindb.find({}).toArray(function(err, result) {
            if (err) throw err;
            db.close();
            res.send(result);
        });
    });
});

app.post('/delete', (req, res) => {
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        var collindb = db.db('collindb').collection('collin');
        let query = req.body;
        console.log(req.body);
        collindb.deleteOne(query, (err, obj) => {
            if (err) throw err;
            console.log('doc deleted');
            res.send('doc deleted');
            db.close();
        })
    })
});

function insertOneInDB(doc) {
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        var collindb = db.db('collindb').collection('collin');
        collindb.insertOne(doc, (err, res) => {
            if (err) throw err;
            console.log('Inserted succesfully');
        });
        db.close();
    });
}