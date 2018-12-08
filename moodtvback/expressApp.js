var express = require('express');
var app = express();
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const client = new MongoClient(url)
const connection = client.connect() // initialized connection

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/getAllChannels', function (req, res) {
    try {
        const connect = connection
        connect.then(() => {
            const db = client.db('moodTv')
            const coll = db.collection('channels')
            coll.find({}).toArray((err, result) => {
                if(err) throw err
                res.status(200).json(result);
            })
        })
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

app.get('/getbyName', function (req, res) {
    var name = req.query.name;
    try {
        const connect = connection
        connect.then(() => {
            const doc = { name: '#'+name }
            const db = client.db('moodTv')
            const coll = db.collection('channels')
            coll.find(doc).toArray((err, result) => {
                if(err) throw err
                res.status(200).json(result);
            })
        })
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

app.get('/sortByMood', function (req, res) {
    var mood = req.query.mood;
    var order = req.query.order;
    if (!order) {
        order = -1
    }
    try {
        const connect = connection
        connect.then(() => {
            const db = client.db('moodTv')
            const coll = db.collection('channels')
            coll.find({}).sort(mood, order).toArray((err, result) => {
                if(err) throw err
                res.status(200).json(result);
            })
        })
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});