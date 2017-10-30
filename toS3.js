//
//
// AWS.config.loadFromPath(__dirname + '/secAWS.json');
// fs.readFile(fileObj.path, function (err, data) {
//     if (err) { throw err;}
//     let base64data = new Buffer(data, 'binary');
//     let s3 = new AWS.S3();
//     let params = {Bucket: 'ozonepimageb', Key: fileObj.filename, Body: base64data, ACL: 'public-read'};
//     s3.upload(params, function (err, resp) {
//         console.log(resp.Location);
//         console.log('Successfully uploaded package');
//     });
// });

const {promisify} = require('util');
const fs = require('fs');
const readFileAsync = promisify(fs.readFile);
const AWS = require('aws-sdk');

// readFileAsync(fileObj).then((data) => {
//     let base64data = new Buffer(data, 'binary');
//     let s3 = new AWS.S3();
//     let params = {Bucket: 'ozonepimageb', Key: fileObj.filename, Body: base64data, ACL: 'public-read'};
//     s3.upload(params, function (err, resp) {
//         console.log(resp.Location);
//         console.log('Successfully uploaded package');
//     });
// });


function sendToS3(fileObj) {
    var imglocation;
    fs.readFile(fileObj.path, function (err, data) {
        if (err) { throw err;}
        AWS.config.loadFromPath(__dirname + '/secAWS.json');
        let base64data = new Buffer(data, 'binary');
        let s3 = new AWS.S3();
        let params = {Bucket: 'ozonepimageb', Key: fileObj.filename, Body: base64data, ACL: 'public-read'};
        s3.upload(params, function (err, resp) {
            imglocation = resp.Location;
            console.log(resp.Location);
            console.log('Successfully uploaded package');
        });
        if (imglocation) {
            console.log("YAAAA", imglocation);
        } else {
            console.log("NOOOO", imglocation)
        }
    });

        // readFileAsync(fileObj.path).then((data) => {
        //     // if (err) {throw err;};
        //     AWS.config.loadFromPath(__dirname + '/secAWS.json');
        //     let base64data = new Buffer(data, 'binary');
        //     let s3 = new AWS.S3();
        //     let params = {Bucket: 'ozonepimageb', Key: fileObj.filename, Body: base64data, ACL: 'public-read'};
        //     var lolo = s3.upload(params, function (err, resp) {
        //         console.log(resp.Location);
        //         // if (resp.Location) {
        //         //     console.log("YAYAAAA");
        //         //     resolve()
        //         // } else {
        //         //     console.log("OHH");
        //         //     reject()
        //         // }
        //         console.log('Successfully uploaded package');
        //     });
        //     lolo.on('response', (resp) => {
        //         if (resp.Location) {
        //             console.log("YAYAAAA");
        //             resolve()
        //         } else {
        //             console.log("OHH");
        //             reject()
        //         }
        //     });
        // });
}




// function sendToS3(fileObj) {
//     return new Promise((resolve, reject) => {
//         const s3Request = client.put(fileObj.filename, {
//             'Content-Type': fileObj.mimetype,
//             'Content-Length': fileObj.size,
//             'x-amz-acl': 'public-read'
//         });
//         const fs = require('fs');
        const readStream = fs.createReadStream(file.path);
        readStream.pipe(s3Request);
//
        s3Request.on('response', s3Response => {
            const wasSuccessful = s3Response.statusCode == 200;
            if (wasSuccessful) {
                resolve()
            } else {
                reject()
            }
        });
    });
}

module.exports.toS3 = sendToS3;

My OLD upload to S3 code:
// fs.readFile(req.file.path, function (err, data) {
//     if (err) { throw err;}
//     AWS.config.loadFromPath(__dirname + '/secAWS.json');
//     let base64data = new Buffer(data, 'binary');
//     let s3 = new AWS.S3();
//     let params = {Bucket: 'ozonepimageb', Key: req.file.filename, Body: base64data, ACL: 'public-read'};
//     s3.upload(params, function (err, resp) {
//         console.log(resp.Location);
//         if (resp.Location) {
//             res.json({
//                 success: true
//             });
//             const text = 'INSERT INTO images (image, username, title, description) VALUES ($1, $2, $3, $4) RETURNING *';
//             const values = [resp.Location, username, title, description];
//             db.query(text, values);
//         } else {
//             res.json({
//                 success: false
//             });
//         }
//         console.log('Successfully uploaded package');
//     });
// });