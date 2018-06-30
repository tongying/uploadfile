"use strict";
exports.__esModule = true;
var express = require("express");
var multer = require("multer");
var path = require('path');
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
    },
    filename: function(req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})
var upload = multer({ storage: storage });
var app = express();
app.use(express.static('dist'));
app.use('/upload', express.static(path.join(__dirname, './uploads/')))
app.post('/uploadimg', upload.array('imgfile', 40), function(req, res, next) {
    var files = req.files
    console.log(files);
    if (!files[0]) {
        res.send('error');
    } else {
        let result = {
            hasError:false,
            message:'上传成功',
            data:files
        }
        res.send(result);
    }
})

var server = app.listen(3000, '0.0.0.0', function() {
        let port = server.address().port
    console.log('server is running at port '+ port);
});