const express = require('express');
const app = express();
const multer = require('multer');
const uidSafe = require('uid-safe');
const bodyParser = require('body-parser');
const path = require('path');
const spicedPg = require('spiced-pg');
const AWS = require('aws-sdk');
const db = spicedPg('postgres://ivanmalkov:password@localhost:5432/img');
const fs = require('fs');
// const toS3 = require('./toS3').toS3;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + '/uploads');
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

var uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});

// app.get('/home', (req,res) => {
//     db.query('SELECT id, image FROM images').then((results) => {
//         var jsonData = results.rows;
//         var data = { images: jsonData };
//         res.json(data);
//     });
//     res.json(data);
// });
app.get('/home', (req,res) => {
    res.json({sus: true});
});


app.post('/upload', uploader.single('file'), function(req, res) {
    console.log("We uploaded the file", req.file);
    if (req.file) {
        fs.readFile(req.file.path, function (err, data) {
            if (err) { throw err;}
            AWS.config.loadFromPath(__dirname + '/secAWS.json');
            let base64data = new Buffer(data, 'binary');
            let s3 = new AWS.S3();
            let params = {Bucket: 'ozonepimageb', Key: req.file.filename, Body: base64data, ACL: 'public-read'};
            s3.upload(params, function (err, resp) {
                console.log(resp.Location);
                if (resp.Location) {
                    console.log("YAAAA");
                    res.json({
                        success: true
                    });
                } else {
                    console.log("NOOOO");
                    res.json({
                        success: false
                    });
                }
                console.log('Successfully uploaded package');
            });
        });
    } else {
        res.json({
            success: false
        });
    }
});

app.listen(8080);