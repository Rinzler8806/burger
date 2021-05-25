var connection = require("./connection");

var orm = {
    selectAll: function (cb) {
        connection.query("SELECT * FROM burgers;", function (err, data) {
            if (err) cb(err, null);
            cb(null, data);
        });
    },

    insertOne: function (table, cols, vals, cb) {
        console.log(vals)
        var sqlQuery = `INSERT INTO burgers(${cols}) VALUES(?,?);`
        connection.query(sqlQuery, vals, function (err, data) {
            if (err) throw err;
            cb(data);
        });
    },
    updateOne: function (table, objColVals, condition, cb) {
        console.log(objColVals)
        var sqlQuery = `UPDATE ${table} SET ? WHERE ?;`
        connection.query(sqlQuery, [
            objColVals,
            condition
        ], function (err, data) {
            if (err) throw err;
            cb(data);
        });
    },
    delete: function (table, condition, cb) {
        var queryString = "DELETE FROM " + table;
        queryString += " WHERE ";
        queryString += condition;

        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }

            cb(result);
        });
    }
};

module.exports = orm;