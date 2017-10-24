const express = require('express');
const app = express();
const multer = require('multer');
const uidSafe = require('uid-safe');
const bodyParser = require('body-parser');
const path = require('path');
const spicedPg = require('spiced-pg');
const db = spicedPg('postgres://ivanmalkov:password@localhost:5432/img');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// var diskStorage = multer.diskStorage({
//     destination: function (req, file, callback) {
//         callback(null, __dirname + '/uploads');
//     },
//     filename: function (req, file, callback) {
//         uidSafe(24).then(function(uid) {
//             callback(null, uid + path.extname(file.originalname));
//         });
//     }
// });
//
// var uploader = multer({
//     storage: diskStorage,
//     limits: {
//         filesize: 2097152
//     }
// });

app.get('/home', (req,res) => {
    db.query('SELECT id, image FROM images').then((results) => {
        var jsonData = results.rows;
        var data = { images: jsonData };
        res.json(data);
    });
});

// app.post('/upload', uploader.single('file'), function(req, res) {
//     // If nothing went wrong the file is already in the uploads directory
//     console.log("We uploaded the file", req.file);
//     if (req.file) {
//         // INSERT INTO db, then just res.json(success)
//         res.json({
//             success: true
//         });
//     } else {
//         res.json({
//             success: false
//         });
//     }
// });

app.listen(8080);