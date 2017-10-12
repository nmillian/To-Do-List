const express = require('express');
const router = express.Router();
const database = require("../database");
const async = require('async');
const moment = require('moment');
module.exports = router;

router.get('/', function(req, res) {
    database.getSaturday({}, function(err, date) {
        if (err) {
            console.error(err);
            res.status(500).send("Error - see console");
            return;
        }
        res.render("saturday/index", {date:date});
    });
});

router.get('/new', function(req, res) {
    res.render("saturday/new", {});
});

router.post('/new', function(req, res) {
    function pad (str, max) {
        str = str.toString();
        return str.length < max ? pad("0" + str, max) : str;
    }

    var saturday_data = req.body;
    var saturday = {
      task : saturday_data.task,
      taskDate : moment(`${saturday_data.year}-${pad(saturday_data.month, 2)}-${pad(saturday_data.day, 2)})`, "YYYY-MM-DD")
    }

    for(i in saturday){
      console.log(saturday[i]);
    }

    database.upsertSaturday(saturday, function(err, result) {
        if (err) {
            console.error(err);
            res.status(500).send("Error - see console");
            return;
        }
        res.redirect("/saturday");
    })
});

router.get('/edit/:id', function(req, res) {
    database.getSaturday({id:req.params.id}, function(err, saturday) {
        if (err) {
            console.error(err);
            res.status(500).send("Error - see console");
            return;
        }
        res.render("saturday/edit", {date:saturday[0]});
    });
});

router.post('/edit/:id', function(req, res) {
    var saturday = req.body;
    saturday.id = req.params.id;
    database.upsertSaturday(saturday, function(err, result) {
        if (err) {
            console.error(err);
            res.status(500).send("Error - see console");
            return;
        }
        res.redirect("/saturday");
    })
});

router.get('/delete/:id', function(req, res) {
    database.getSaturday({id:req.params.id}, function(err, saturday) {
        if (err) {
            console.error(err);
            res.status(500).send("Error - see console");
            return;
        }
        res.render("saturday/delete", {date:saturday[0]});
    });
});

router.post('/delete/:id', function(req, res) {
    database.deleteSaturday(req.params.id, function(err, result) {
        if (err) {
            console.error(err);
            res.status(500).send("Error - see console");
            return;
        }
        res.redirect("/saturday");
    })
})
