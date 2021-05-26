var createError = require('http-errors');
var express = require('express');
var bodyParser=require('body-parser')
var mongoose=require('mongoose');
var cors=require('cors');

const authenticate = require("./authenticate");

var usersRouter = require('./routes/users-route');
var booksRouter = require("./routes/books-route");
var categoriesRouter = require("./routes/categories-route");

var app = express();

app.use(cors());
app.use(bodyParser.json({extended:false}));

//connect to DB
//mongoose.connect(process.env.OgatDBConnection, { useNewUrlParser: true,useUnifiedTopology:true })
mongoose.connect("mongodb://localhost:27017/books", { useNewUrlParser: true,useUnifiedTopology:true })
.then((db)=>console.log("connected to DB"))
.catch(()=>console.log("Couldn't connect to DB"))

app.use('/users', usersRouter);
app.use('/books',authenticate.authenticate, booksRouter);
app.use('/categories',authenticate.authenticate, categoriesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
