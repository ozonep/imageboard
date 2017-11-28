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
const stream = require('stream');
const Vision = require('@google-cloud/vision');
const vision = new Vision({
    keyFilename: '/Users/ivanmalkov/Desktop/dev/nutmeg-imageboard/google.json'
});

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

app.post('/upload', uploader.single('file'), function(req, res) {
    console.log("We uploaded the file");
    let filik = req.file;
    const fileName = filik.path;
    const request = {
        source: {
            filename: fileName
        }
    };
    vision.labelDetection(request)
        .then((results) => {
            const labels = results[0].labelAnnotations;
            console.log(labels);
            labels.forEach((label) => {
                console.log(label.description)
            });
        })
        .catch((err) => {
            console.error('ERROR:', err);
        });
    let username = req.body.username;
    let title = req.body.title;
    let description = req.body.description;
    let tags = req.body.tags;
    if (req.file) {
        AWS.config.loadFromPath(__dirname + '/secAWS.json');
        let s3 = new AWS.S3();
        const readStream = fs.createReadStream(filik.path);
        readStream.pipe(uploadFromStream(s3));
        function uploadFromStream(s3) {
            var pass = new stream.PassThrough();
            let params = {Bucket: 'ozonepimageb', Key: req.file.filename, Body: pass, ACL: 'public-read'};
            s3.upload(params, function (err, resp) {
                console.log(resp.Location);
                if (resp.Location) {
                    res.json({
                        success: true
                    });
                    const text = 'INSERT INTO images (image, username, title, description) VALUES ($1, $2, $3, $4)';
                    const values = [resp.Location, username, title, description];
                    db.query(text, values);
                } else {
                    res.json({
                        success: false
                    });
                }
                console.log('Successfully uploaded package');
            });
            return pass;
        }
    } else {
        res.json({
            success: false
        });
    }
});

app.listen(8080);