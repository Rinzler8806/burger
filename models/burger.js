// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var burgers = {
  all: function(cb) {
    orm.Selectall("burgers", function(res) {
      cb(res);
    });
  },
  // The variables cols and vals are arrays.
  create: function(colOne, colTwo, valOne, valTwo, cb) {
    orm.insertOne("burgers", colOne, colTwo, valOne, valTwo, function(res) {
      cb(res);
    });
  },
  update: function(updateColVals, condition, cb) {
    orm.updateOne("burgers", updateColVals, condition, function(res) {
      cb(res);
    });
  },
  delete: function(condition, cb) {
    orm.delete("burgers", condition, function(res) {
      cb(res);
    });
  }
};

// Export the database functions for the controller (burger_controller.js).
module.exports = burgers;
