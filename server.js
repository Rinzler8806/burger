var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

var app = express();

var routes = require("./controllers/burger_controllers");
// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8082;

// Sets up the Express app to handle data parsing
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(methodOverride("_method"));

app.engine("handlebars", exphbs({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");

app.use(routes);

// Root get route
app.get("/", function (req, res) {
  connection.query("SELECT * FROM burgers;", function (err, data) {
    if (err) throw err;

    // Test it
    // console.log('The solution is: ', data);

    // Test it
    // return res.send(data);

    res.render("index", {
      burgers: data
    });
  });
});

// Post route -> back to home
app.post("/", function (req, res) {
  // Test it
  // console.log('You sent, ' + req.body.task);

  // Test it
  // return res.send('You sent, ' + req.body.task);

  // When using the MySQL package, we'd use ?s in place of any values to be inserted, which are then swapped out with corresponding elements in the array
  // This helps us avoid an exploit known as SQL injection which we'd be open to if we used string concatenation
  // https://en.wikipedia.org/wiki/SQL_injection
  connection.query("INSERT INTO burgers (task) VALUES (?)", [req.body.task], function (err, result) {
    if (err) throw err;

    res.redirect("/");
  });
});

app.listen(PORT, function () {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});