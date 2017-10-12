const express = require('express');
const router = express.Router();
const database = require("../database");
const async = require('async');
const moment = require('moment');
module.exports = router;

router.get('/', function(req, res) {
    database.getMonday({}, function(err, date) {
        if (err) {
            console.error(err);
            res.status(500).send("Error - see console");
            return;
        }
        res.render("monday/index", {date:date});
    });
});

router.get('/new', function(req, res) {
    res.render("monday/new", {});
});

router.post('/new', function(req, res) {
    function pad (str, max) {
        str = str.toString();
        return str.length < max ? pad("0" + str, max) : str;
    }

    var monday_data = req.body;
    var monday = {
      task : monday_data.task,
      taskDate : moment(`${monday_data.year}-${pad(monday_data.month, 2)}-${pad(monday_data.day, 2)})`, "YYYY-MM-DD")
    }

    for(i in monday){
      console.log(monday[i]);
    }

    database.upsertMonday(monday, function(err, result) {
        if (err) {
            console.error(err);
            res.status(500).send("Error - see console");
            return;
        }
        res.redirect("/monday");
    })
});

router.get('/edit/:id', function(req, res) {
    database.getMonday({id:req.params.id}, function(err, monday) {
        if (err) {
            console.error(err);
            res.status(500).send("Error - see console");
            return;
        }
        res.render("monday/edit", {date:monday[0]});
    });
});

router.post('/edit/:id', function(req, res) {
    var monday = req.body;
    monday.id = req.params.id;
    database.upsertMonday(monday, function(err, result) {
        if (err) {
            console.error(err);
            res.status(500).send("Error - see console");
            return;
        }
        res.redirect("/monday");
    })
});

router.get('/delete/:id', function(req, res) {
    database.getMonday({id:req.params.id}, function(err, monday) {
        if (err) {
            console.error(err);
            res.status(500).send("Error - see console");
            return;
        }
        res.render("monday/delete", {date:monday[0]});
    });
});

router.post('/delete/:id', function(req, res) {
    database.deleteMonday(req.params.id, function(err, result) {
        if (err) {
            console.error(err);
            res.status(500).send("Error - see console");
            return;
        }
        res.redirect("/monday");
    })
})
