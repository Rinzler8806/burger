var express = require("express");
var router = express.Router();

var orm = require('../config/orm');
router.get("/", function (req, res) {
    orm.selectAll(function(error, burgers) {
        if (error) {
            return res.render.status(501).json({
                message: 'Not able to query the database'
            });
        }
        res.render("index");
    });
});


module.exports = router;