var express = require("express");
var router = express.Router();

var burgers = require("../models/burger.js")

var orm = require('../config/orm');
router.get("/", function (req, res) {
  orm.selectAll(function (error, burgers) {
    if (error) {
      return res.render.status(501).json({
        message: 'Not able to query the database'
      });
    }
    var hbsObject = {
      burgers: burgers
    };
    console.log(hbsObject)
    res.render("index", hbsObject);
  });
});

router.post("/api/burgers", function (req, res) {
  console.log(req.body)
  burgers.create([
    "name", "devoured"
  ], [
    req.body.name, req.body.devoured
  ], function (result) {
    // Send back the ID of the new quote
    res.json({
      id: result.insertId
    });
  });
});

router.put("/api/burgers/:id", function (req, res) {
  console.log(req.body)
  var condition = {
    id: req.params.id
  };
  burgers.update(
    req.body,
    condition,
    function (result) {
      if (result.changedRows === 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      }
      res.status(200).end();
    }
  );
});

router.delete("/api/burgers/:id", function (req, res) {
  var condition = "id = " + req.params.id;

  burgers.delete(condition, function (result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

module.exports = router;