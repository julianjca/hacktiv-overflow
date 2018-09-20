const express = require('express');
const app = express();
const cors = require('cors');
const mongoose   = require('mongoose');

const users = require('./routes/users');
const questions = require('./routes/questions');
const comments = require('./routes/comments');

require('dotenv').config();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routing
app.use('/users',users);
app.use('/questions',questions);
app.use('/comments',comments);

//Mongoose

let url = `mongodb://${process.env.USER_MLAB}:${process.env.PASSWORD}@ds163842.mlab.com:63842/hacktiv-overflow`;


mongoose.connect(url,{ useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('We are connected');
});

app.listen(port,()=>{
  console.log(`application is on port:${port}`);
});




module.exports = app;
