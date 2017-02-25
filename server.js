var express = require("express");
var app = express();
var cookeiParser = require("cookie-parser");
var bodyParser = require("body-parser");
var ejs = require("ejs");
var engine = require("ejs-mate");
var session = require("express-session");
var MongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/rateme');

app.use(express.static("public"));
app.engine("ejs", engine);
app.set("view engine", "ejs");
app.use(cookeiParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(session({
  secret: 'Thisismytestkey.', 
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({mongooseConnection: mongoose.connection})
}));

require('./routes/user')(app);


app.listen('3000', function(){
  console.log("App is running on port 3000");
});


