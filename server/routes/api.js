const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
let bodyParser = require("body-parser");

// Connect
const connection = (closure) => {
    return MongoClient.connect('mongodb://localhost:27017/aeo', (err, db) => {
        if (err) return console.log(err);

        closure(db);
    });
};

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

// Get users
router.get('/users', (req, res) => {
    connection((db) => {
        db.collection('users')
            .find()
            .toArray()
            .then((users) => {
                response.data = users;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

// Get jems
router.get('/jems', (req, res) => {
    connection((db) => {
        db.collection('jems')
            .find().sort({title:1})
            .toArray()
            .then((jems) => {
                response.data = jems;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

// get collection
router.get('/collection/:id', (req, res) => {
    let name = req.params.id.charAt(0).toUpperCase() + req.params.id.slice(1);

    connection((db) => {
        db.collection('collection').findOne({name: name},function(err,document){
          response.data = document;
          res.json(response);
        });
    });
});

module.exports = router;
