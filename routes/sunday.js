const express = require('express');
const router = express.Router();
const database = require("../database");
const async = require('async');
const moment = require('moment');
module.exports = router;

router.get('/', function(req, res) {
    database.getSunday({}, function(err, date) {
        if (err) {
            console.error(err);
            res.status(500).send("Error - see console");
            return;
        }
        res.render("sunday/index", {date:date});
    });
});

router.get('/new', function(req, res) {
    res.render("sunday/new", {});
});

router.post('/new', function(req, res) {
    function pad (str, max) {
        str = str.toString();
        return str.length < max ? pad("0" + str, max) : str;
    }

    var sunday_data = req.body;
    var sunday = {
      task : sunday_data.task,
      taskDate : moment(`${sunday_data.year}-${pad(sunday_data.month, 2)}-${pad(sunday_data.day, 2)})`, "YYYY-MM-DD")
    }

    for(i in sunday){
      console.log(sunday[i]);
    }

    database.upsertSunday(sunday, function(err, result) {
        if (err) {
            console.error(err);
            res.status(500).send("Error - see console");
            return;
        }
        res.redirect("/sunday");
    })
});

router.get('/edit/:id', function(req, res) {
    database.getSunday({id:req.params.id}, function(err, sunday) {
        if (err) {
            console.error(err);
            res.status(500).send("Error - see console");
            return;
        }
        res.render("sunday/edit", {date:sunday[0]});
    });
});

router.post('/edit/:id', function(req, res) {
    var sunday = req.body;
    sunday.id = req.params.id;
    database.upsertSunday(sunday, function(err, result) {
        if (err) {
            console.error(err);
            res.status(500).send("Error - see console");
            return;
        }
        res.redirect("/sunday");
    })
});

router.get('/delete/:id', function(req, res) {
    database.getSunday({id:req.params.id}, function(err, sunday) {
        if (err) {
            console.error(err);
            res.status(500).send("Error - see console");
            return;
        }
        res.render("sunday/delete", {date:sunday[0]});
    });
});

router.post('/delete/:id', function(req, res) {
    database.deleteSunday(req.params.id, function(err, result) {
        if (err) {
            console.error(err);
            res.status(500).send("Error - see console");
            return;
        }
        res.redirect("/sunday");
    })
})
