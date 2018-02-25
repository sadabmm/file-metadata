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

//The memory storage engine stores the files in memory as Buffer objects. It doesn't have any options.
var storage = multer.memoryStorage();
var upload = multer({ storage: storage }).single('myFile');

app.post('/getFileInfo', function (req, res) {
	upload(req, res, function(err) {
	    if(err){
	        console.log('The file cannot be uploaded. Error: '+err);
	    } else {
	        var filetype = req.file.originalname;
	        var extension = filetype.split('.')[1];
	        var info = {
	        "size" : req.file.size,
	        "file extension": extension
	        };
		    res.json(info);
		    console.log(req.file);
	    }
	});
});

app.listen(process.env.PORT, ()=>{
    console.log("This app is now listening on port: "+process.env.PORT);
});
