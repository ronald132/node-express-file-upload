var express = require("express");
var bodyParser = require("body-parser");
var ejs = require("ejs");
var ejs_mate = require("ejs-mate");


var multer = require("multer");
var upload = multer({ dest: "uploads"});

var app = express();

app.use(express.static(__dirname + "/uploads"));
app.engine("ejs", ejs_mate);
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post("/profile", upload.single("avatar"), function(req, res, next){
    console.log("get username: ", req.body.username);
    res.status(200).json({"status": "Ok", "location": req.file.path});
})

app.get("/", function(req, res){
    res.render("home");
})


app.set("port", process.env.PORT || 3000);

app.listen(app.get("port"), function(){
  console.log("listening port 3000");
});
