const express = require('express');
const router = express.Router();
const database = require("../database");
const async = require('async');
const moment = require('moment');
module.exports = router;

router.get('/', function(req, res) {
    database.getFriday({}, function(err, date) {
        if (err) {
            console.error(err);
            res.status(500).send("Error - see console");
            return;
        }
        res.render("friday/index", {date:date});
    });
});

router.get('/new', function(req, res) {
    res.render("friday/new", {});
});

router.post('/new', function(req, res) {
    function pad (str, max) {
        str = str.toString();
        return str.length < max ? pad("0" + str, max) : str;
    }

    var friday_data = req.body;
    var friday = {
      task : friday_data.task,
      taskDate : moment(`${friday_data.year}-${pad(friday_data.month, 2)}-${pad(friday_data.day, 2)})`, "YYYY-MM-DD")
    }

    for(i in friday){
      console.log(friday[i]);
    }

    database.upsertFriday(friday, function(err, result) {
        if (err) {
            console.error(err);
            res.status(500).send("Error - see console");
            return;
        }
        res.redirect("/friday");
    })
});

router.get('/edit/:id', function(req, res) {
    database.getFriday({id:req.params.id}, function(err, friday) {
        if (err) {
            console.error(err);
            res.status(500).send("Error - see console");
            return;
        }
        res.render("friday/edit", {date:friday[0]});
    });
});

router.post('/edit/:id', function(req, res) {
    var friday = req.body;
    friday.id = req.params.id;
    database.upsertFriday(friday, function(err, result) {
        if (err) {
            console.error(err);
            res.status(500).send("Error - see console");
            return;
        }
        res.redirect("/friday");
    })
});

router.get('/delete/:id', function(req, res) {
    database.getFriday({id:req.params.id}, function(err, friday) {
        if (err) {
            console.error(err);
            res.status(500).send("Error - see console");
            return;
        }
        res.render("friday/delete", {date:friday[0]});
    });
});

router.post('/delete/:id', function(req, res) {
    database.deleteFriday(req.params.id, function(err, result) {
        if (err) {
            console.error(err);
            res.status(500).send("Error - see console");
            return;
        }
        res.redirect("/friday");
    })
})
