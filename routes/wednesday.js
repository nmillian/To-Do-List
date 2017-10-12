const express = require('express');
const router = express.Router();
const database = require("../database");
const async = require('async');
const moment = require('moment');
module.exports = router;

router.get('/', function(req, res) {
    database.getWednesday({}, function(err, date) {
        if (err) {
            console.error(err);
            res.status(500).send("Error - see console");
            return;
        }
        res.render("wednesday/index", {date:date});
    });
});

router.get('/new', function(req, res) {
    res.render("wednesday/new", {});
});

router.post('/new', function(req, res) {
    function pad (str, max) {
        str = str.toString();
        return str.length < max ? pad("0" + str, max) : str;
    }

    var wednesday_data = req.body;
    var wednesday = {
      task : wednesday_data.task,
      taskDate : moment(`${wednesday_data.year}-${pad(wednesday_data.month, 2)}-${pad(wednesday_data.day, 2)})`, "YYYY-MM-DD")
    }

    for(i in wednesday){
      console.log(wednesday[i]);
    }

    database.upsertWednesday(wednesday, function(err, result) {
        if (err) {
            console.error(err);
            res.status(500).send("Error - see console");
            return;
        }
        res.redirect("/wednesday");
    })
});

router.get('/edit/:id', function(req, res) {
    database.getWednesday({id:req.params.id}, function(err, wednesday) {
        if (err) {
            console.error(err);
            res.status(500).send("Error - see console");
            return;
        }
        res.render("wednesday/edit", {date:wednesday[0]});
    });
});

router.post('/edit/:id', function(req, res) {
    var wednesday = req.body;
    wednesday.id = req.params.id;
    database.upsertwednesday(wednesday, function(err, result) {
        if (err) {
            console.error(err);
            res.status(500).send("Error - see console");
            return;
        }
        res.redirect("/wednesday");
    })
});

router.get('/delete/:id', function(req, res) {
    database.getWednesday({id:req.params.id}, function(err, wednesday) {
        if (err) {
            console.error(err);
            res.status(500).send("Error - see console");
            return;
        }
        res.render("wednesday/delete", {date:wednesday[0]});
    });
});

router.post('/delete/:id', function(req, res) {
    database.deleteWednesday(req.params.id, function(err, result) {
        if (err) {
            console.error(err);
            res.status(500).send("Error - see console");
            return;
        }
        res.redirect("/wednesday");
    })
})
