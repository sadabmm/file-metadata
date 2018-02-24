const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, 'views')));

/*
var storage = multer.diskStorage({
    destination: function(req, file, callback) {
		callback(null, './uploads');
	},
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
    }
});
*/

var storage = multer.memoryStorage()
var upload = multer({ storage: storage }).single('myFile');

app.post('/getFileInfo', function (req, res) {
	upload(req, res, function(err) {
	    var size = {
	        size : req.file.size + ' bytes'
	    };
		res.json(size);
		console.log(req.file);
	});
});

app.listen(process.env.PORT, ()=>{
    console.log("This app is now listening on port: "+process.env.PORT);
})