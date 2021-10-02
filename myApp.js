var express = require('express');
var app = express();

//Import and add middleware to for POST request (parse the POST body)
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

console.log('Hello World');

app.use('/', (req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

const absolutePath = __dirname + '/views/index.html';
app.get('/', (req, res) => {
  res.sendFile(absolutePath);
});

//Use static folder to store static file for general use like css file
const absStaticPath = __dirname + '/public';
app.use('/public', express.static(absStaticPath));

//The use of .env file (or secret in Replit)
app.get('/json', (req, res) => {
  if (process.env['MESSAGE_STYLE'] == 'uppercase') {
    res.json({"message": "HELLO JSON"});
  }
  else {
    res.json({"message": "Hello json"});
  }
});

//Chaining callback functions with next()
app.get('/now', (req, res, next) => {
  req.time = new Date().toString();
  next();
},
(req, res) => {
  res.json({"time": req.time});
});

//Set and get the parameters from GET request
app.get('/:word/echo', (req, res) => {
  res.json({"echo": req.params.word});
});

//Chaining GET and POST request for a route ***NOTE that POST needs body-parser
app.route("/name").get((req, res) => {
  res.json({"name": req.query.first + " " + req.query.last});
})
.post((req, res) => {
  res.json({"name": req.body.first + " " + req.body.last});
});

 module.exports = app;
