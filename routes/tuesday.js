const express = require('express');
const router = express.Router();
const database = require("../database");
const async = require('async');
const moment = require('moment');
module.exports = router;

router.get('/', function(req, res) {
    database.getTuesday({}, function(err, date) {
        if (err) {
            console.error(err);
            res.status(500).send("Error - see console");
            return;
        }
        res.render("tuesday/index", {date:date});
    });
});

router.get('/new', function(req, res) {
    res.render("tuesday/new", {});
});

router.post('/new', function(req, res) {
    function pad (str, max) {
        str = str.toString();
        return str.length < max ? pad("0" + str, max) : str;
    }

    var tuesday_data = req.body;
    var tuesday = {
      task : tuesday_data.task,
      taskDate : moment(`${tuesday_data.year}-${pad(tuesday_data.month, 2)}-${pad(tuesday_data.day, 2)})`, "YYYY-MM-DD")
    }

    for(i in tuesday){
      console.log(tuesday[i]);
    }

    database.upsertTuesday(tuesday, function(err, result) {
        if (err) {
            console.error(err);
            res.status(500).send("Error - see console");
            return;
        }
        res.redirect("/tuesday");
    })
});

router.get('/edit/:id', function(req, res) {
    database.getTuesday({id:req.params.id}, function(err, tuesday) {
        if (err) {
            console.error(err);
            res.status(500).send("Error - see console");
            return;
        }
        res.render("tuesday/edit", {date:tuesday[0]});
    });
});

router.post('/edit/:id', function(req, res) {
    var tuesday = req.body;
    tuesday.id = req.params.id;
    database.upsertTuesday(tuesday, function(err, result) {
        if (err) {
            console.error(err);
            res.status(500).send("Error - see console");
            return;
        }
        res.redirect("/tuesday");
    })
});

router.get('/delete/:id', function(req, res) {
    database.getTuesday({id:req.params.id}, function(err, tuesday) {
        if (err) {
            console.error(err);
            res.status(500).send("Error - see console");
            return;
        }
        res.render("tuesday/delete", {date:tuesday[0]});
    });
});

router.post('/delete/:id', function(req, res) {
    database.deleteTuesday(req.params.id, function(err, result) {
        if (err) {
            console.error(err);
            res.status(500).send("Error - see console");
            return;
        }
        res.redirect("/tuesday");
    })
})
