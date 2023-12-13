require('dotenv').config(); 
require("./models/connection"); 
const cors = require('cors'); 
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const ingredientsRouter = require('./routes/ingredients')
const preferencesRouter = require('./routes/preferences'); 

var app = express();
app.use(cors()); 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/ingredients",ingredientsRouter)
app.use("/preferences", preferencesRouter)

module.exports = app;
