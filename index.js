const http = require('http');
const express = require('express');
const app = express();
const busboy = require('express-busboy');
const port = process.env.PORT || 3000;

// Bootstrap the database schema
require("./database").build();

app.set('port', port);
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
busboy.extend(app,{});

const root = require("./routes/index");

const monday = require("./routes/monday");
const tuesday = require("./routes/tuesday");
const wednesday = require("./routes/wednesday");
const thursday = require("./routes/thursday");
const friday = require("./routes/friday");
const saturday = require("./routes/saturday");
const sunday = require("./routes/sunday");

app.use(function(req, res, next){
    res.locals.moment = require("moment");
    next();
})

app.use("/", root);

app.use("/monday", monday);
app.use("/tuesday", tuesday);
app.use("/wednesday", wednesday);
app.use("/thursday", thursday);
app.use("/friday", friday);
app.use("/saturday", saturday);
app.use("/sunday", sunday);


http.createServer(app).listen(port);
console.log("Web application running @ http://localhost:" + port);
