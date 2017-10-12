//Nicole Millian
//To do list

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('todolist.db');

const moment = require('moment');

///////////////////////////////////////////////////////

/**
 * This function is called at application startup.
 */
exports.build = function() {
    db.serialize(function(){

      db.run("CREATE TABLE if not exists Monday(id INTEGER PRIMARY KEY AUTOINCREMENT, task TEXT, taskDate DATE)");

      db.run("CREATE TABLE if not exists Tuesday(id INTEGER PRIMARY KEY AUTOINCREMENT, task TEXT, taskDate DATE)");

      db.run("CREATE TABLE if not exists Wednesday(id INTEGER PRIMARY KEY AUTOINCREMENT, task TEXT, taskDate DATE)");

      db.run("CREATE TABLE if not exists Thursday(id INTEGER PRIMARY KEY AUTOINCREMENT, task TEXT, taskDate DATE)");

      db.run("CREATE TABLE if not exists Friday(id INTEGER PRIMARY KEY AUTOINCREMENT, task TEXT, taskDate DATE)");

      db.run("CREATE TABLE if not exists Saturday(id INTEGER PRIMARY KEY AUTOINCREMENT, task TEXT, taskDate DATE)");

      db.run("CREATE TABLE if not exists Sunday(id INTEGER PRIMARY KEY AUTOINCREMENT, task TEXT, taskDate DATE)");


    });

}

/**************************************************************
Monday
***************************************************************/
//Get
exports.getMonday = function(options, callback) {
  if (options.id) {
      db.all("SELECT id, task, taskDate FROM Monday WHERE id="+options.id, callback);
  }

  else {
      db.all("SELECT id, task, taskDate FROM Monday", callback);
  }
}

//Insert/upsert
exports.upsertMonday = function(monday, callback) {
  var id = monday["id"];

  var month = parseInt(monday["taskDate"].month()) + 1;
  var dates = monday["taskDate"].year() + "-" + month + "-" + monday["taskDate"].date();

  db.get("SELECT id FROM Monday WHERE id="+id, function(error, row) {

      if (row !== undefined) {
        db.run("UPDATE Monday SET task = ?, taskDate = ? WHERE id = ?", monday["task"], dates, id, callback);
      }

      else {
       db.serialize(function(){
         var stmt = db.prepare("INSERT INTO Monday VALUES (NULL, ?, ?)");
         stmt.run(monday["task"], dates, callback);
         stmt.finalize();
       });
     }
 });
}

//Delete
exports.deleteMonday = function(id, callback) {
    db.run("DELETE FROM Monday WHERE Monday.id="+id, callback);
}
/*************************************************************
**************************************************************/

/**************************************************************
Tuesday
***************************************************************/
//Get
exports.getTuesday = function(options, callback) {
  if (options.id) {
      db.all("SELECT id, task, taskDate FROM Tuesday WHERE id="+options.id, callback);
  }

  else {
      db.all("SELECT id, task, taskDate FROM Tuesday", callback);
  }
}

//Insert/upsert
exports.upsertTuesday = function(tuesday, callback) {
  var id = tuesday["id"];

  var month = parseInt(tuesday["taskDate"].month()) + 1;
  var dates = tuesday["taskDate"].year() + "-" + month + "-" + tuesday["taskDate"].date();

  db.get("SELECT id FROM Tuesday WHERE id="+id, function(error, row) {

      if (row !== undefined) {
        db.run("UPDATE Tuesday SET task = ?, taskDate = ? WHERE id = ?", tuesday["task"], dates, id, callback);
      }

      else {
       db.serialize(function(){
         var stmt = db.prepare("INSERT INTO Tuesday VALUES (NULL, ?, ?)");
         stmt.run(tuesday["task"], dates, callback);
         stmt.finalize();
       });
     }
 });
}

//Delete
exports.deleteTuesday = function(id, callback) {
    db.run("DELETE FROM Tuesday WHERE Tuesday.id="+id, callback);
}
/*************************************************************
**************************************************************/

/**************************************************************
Wednesday
***************************************************************/
//Get
exports.getWednesday = function(options, callback) {
  if (options.id) {
      db.all("SELECT id, task, taskDate FROM Wednesday WHERE id="+options.id, callback);
  }

  else {
      db.all("SELECT id, task, taskDate FROM Wednesday", callback);
  }
}

//Insert/upsert
exports.upsertWednesday = function(wednesday, callback) {
  var id = wednesday["id"];

  var month = parseInt(wednesday["taskDate"].month()) + 1;
  var dates = wednesday["taskDate"].year() + "-" + month + "-" + wednesday["taskDate"].date();

  db.get("SELECT id FROM Wednesday WHERE id="+id, function(error, row) {

      if (row !== undefined) {
        db.run("UPDATE Wednesday SET task = ?, taskDate = ? WHERE id = ?", Wednesday["task"], dates, id, callback);
      }

      else {
       db.serialize(function(){
         var stmt = db.prepare("INSERT INTO Wednesday VALUES (NULL, ?, ?)");
         stmt.run(wednesday["task"], dates, callback);
         stmt.finalize();
       });
     }
 });
}

//Delete
exports.deleteWednesday = function(id, callback) {
    db.run("DELETE FROM Wednesday WHERE Wednesday.id="+id, callback);
}
/*************************************************************
**************************************************************/

/**************************************************************
Thursday
***************************************************************/
//Get
exports.getThursday = function(options, callback) {
  if (options.id) {
      db.all("SELECT id, task, taskDate FROM Thursday WHERE id="+options.id, callback);
  }

  else {
      db.all("SELECT id, task, taskDate FROM Thursday", callback);
  }
}

//Insert/upsert
exports.upsertThursday = function(thursday, callback) {
  var id = thursday["id"];

  var month = parseInt(thursday["taskDate"].month()) + 1;
  var dates = thursday["taskDate"].year() + "-" + month + "-" + thursday["taskDate"].date();

  db.get("SELECT id FROM Thursday WHERE id="+id, function(error, row) {

      if (row !== undefined) {
        db.run("UPDATE Thursday SET task = ?, taskDate = ? WHERE id = ?", thursday["task"], dates, id, callback);
      }

      else {
       db.serialize(function(){
         var stmt = db.prepare("INSERT INTO Thursday VALUES (NULL, ?, ?)");
         stmt.run(thursday["task"], dates, callback);
         stmt.finalize();
       });
     }
 });
}

//Delete
exports.deleteThursday = function(id, callback) {
    db.run("DELETE FROM Thursday WHERE Thursday.id="+id, callback);
}
/*************************************************************
**************************************************************/

/**************************************************************
Friday
***************************************************************/
//Get
exports.getFriday = function(options, callback) {
  if (options.id) {
      db.all("SELECT id, task, taskDate FROM Friday WHERE id="+options.id, callback);
  }

  else {
      db.all("SELECT id, task, taskDate FROM Friday", callback);
  }
}

//Insert/upsert
exports.upsertFriday = function(friday, callback) {
  var id = friday["id"];

  var month = parseInt(friday["taskDate"].month()) + 1;
  var dates = friday["taskDate"].year() + "-" + month + "-" + friday["taskDate"].date();

  db.get("SELECT id FROM Friday WHERE id="+id, function(error, row) {

      if (row !== undefined) {
        db.run("UPDATE Friday SET task = ?, taskDate = ? WHERE id = ?", Friday["task"], dates, id, callback);
      }

      else {
       db.serialize(function(){
         var stmt = db.prepare("INSERT INTO Friday VALUES (NULL, ?, ?)");
         stmt.run(friday["task"], dates, callback);
         stmt.finalize();
       });
     }
 });
}

//Delete
exports.deleteFriday = function(id, callback) {
    db.run("DELETE FROM Friday WHERE Friday.id="+id, callback);
}
/*************************************************************
**************************************************************/

/**************************************************************
Saturday
***************************************************************/
//Get
exports.getSaturday = function(options, callback) {
  if (options.id) {
      db.all("SELECT id, task, taskDate FROM Saturday WHERE id="+options.id, callback);
  }

  else {
      db.all("SELECT id, task, taskDate FROM Saturday", callback);
  }
}

//Insert/upsert
exports.upsertSaturday = function(saturday, callback) {
  var id = saturday["id"];

  var month = parseInt(saturday["taskDate"].month()) + 1;
  var dates = saturday["taskDate"].year() + "-" + month + "-" + saturday["taskDate"].date();

  db.get("SELECT id FROM Saturday WHERE id="+id, function(error, row) {

      if (row !== undefined) {
        db.run("UPDATE Saturday SET task = ?, taskDate = ? WHERE id = ?", Saturday["task"], dates, id, callback);
      }

      else {
       db.serialize(function(){
         var stmt = db.prepare("INSERT INTO Saturday VALUES (NULL, ?, ?)");
         stmt.run(saturday["task"], dates, callback);
         stmt.finalize();
       });
     }
 });
}

//Delete
exports.deleteSaturday = function(id, callback) {
    db.run("DELETE FROM Saturday WHERE Saturday.id="+id, callback);
}
/*************************************************************
**************************************************************/

/**************************************************************
Sunday
***************************************************************/
//Get
exports.getSunday = function(options, callback) {
  if (options.id) {
      db.all("SELECT id, task, taskDate FROM Sunday WHERE id="+options.id, callback);
  }

  else {
      db.all("SELECT id, task, taskDate FROM Sunday", callback);
  }
}

//Insert/upsert
exports.upsertSunday = function(sunday, callback) {
  var id = sunday["id"];

  var month = parseInt(sunday["taskDate"].month()) + 1;
  var dates = sunday["taskDate"].year() + "-" + month + "-" + sunday["taskDate"].date();

  db.get("SELECT id FROM Sunday WHERE id="+id, function(error, row) {

      if (row !== undefined) {
        db.run("UPDATE Sunday SET task = ?, taskDate = ? WHERE id = ?", Sunday["task"], dates, id, callback);
      }

      else {
       db.serialize(function(){
         var stmt = db.prepare("INSERT INTO Sunday VALUES (NULL, ?, ?)");
         stmt.run(sunday["task"], dates, callback);
         stmt.finalize();
       });
     }
 });
}

//Delete
exports.deleteSunday = function(id, callback) {
    db.run("DELETE FROM Sunday WHERE Sunday.id="+id, callback);
}
/*************************************************************
**************************************************************/
