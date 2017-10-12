const express = require('express');
const router = express.Router();
const database = require("../database");
const async = require('async');
const moment = require('moment');
module.exports = router;

router.get('/', function(req, res) {
    database.getThursday({}, function(err, date) {
        if (err) {
            console.error(err);
            res.status(500).send("Error - see console");
            return;
        }
        res.render("thursday/index", {date:date});
    });
});

router.get('/new', function(req, res) {
    res.render("thursday/new", {});
});

router.post('/new', function(req, res) {
    function pad (str, max) {
        str = str.toString();
        return str.length < max ? pad("0" + str, max) : str;
    }

    var thursday_data = req.body;
    var thursday = {
      task : thursday_data.task,
      taskDate : moment(`${thursday_data.year}-${pad(thursday_data.month, 2)}-${pad(thursday_data.day, 2)})`, "YYYY-MM-DD")
    }

    for(i in thursday){
      console.log(thursday[i]);
    }

    database.upsertThursday(thursday, function(err, result) {
        if (err) {
            console.error(err);
            res.status(500).send("Error - see console");
            return;
        }
        res.redirect("/thursday");
    })
});

router.get('/edit/:id', function(req, res) {
    database.getThursday({id:req.params.id}, function(err, thursday) {
        if (err) {
            console.error(err);
            res.status(500).send("Error - see console");
            return;
        }
        res.render("thursday/edit", {date:thursday[0]});
    });
});

router.post('/edit/:id', function(req, res) {
    var thursday = req.body;
    thursday.id = req.params.id;
    database.upsertThursday(thursday, function(err, result) {
        if (err) {
            console.error(err);
            res.status(500).send("Error - see console");
            return;
        }
        res.redirect("/thursday");
    })
});

router.get('/delete/:id', function(req, res) {
    database.getThursday({id:req.params.id}, function(err, thursday) {
        if (err) {
            console.error(err);
            res.status(500).send("Error - see console");
            return;
        }
        res.render("thursday/delete", {date:thursday[0]});
    });
});

router.post('/delete/:id', function(req, res) {
    database.deleteThursday(req.params.id, function(err, result) {
        if (err) {
            console.error(err);
            res.status(500).send("Error - see console");
            return;
        }
        res.redirect("/thursday");
    })
})
