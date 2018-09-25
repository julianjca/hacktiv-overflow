const cron = require('node-cron');
const User = require('./models/user');
const kue = require('kue')
  , queue = kue.createQueue();
const nodemailer = require('nodemailer');
require('dotenv').config();

require('./models/question');
require('./models/comment');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD
    }
 });
const mongoose   = require('mongoose');

let url = `mongodb://${process.env.USER_MLAB}:${process.env.PASSWORD}@ds163842.mlab.com:63842/hacktiv-overflow`;


mongoose.connect(url,{ useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('We are connected');
});

let data = []
function findUser(){
  console.log('masuk')

  User.find({})
  .populate('questions')
  .exec()
 .then(response=>{
   response.forEach(user=>{
     let questions = ``
     for(let i = 0;i<user.questions.length;i++){
       questions+= `
       <strong>Questions : ${user.questions[i].title}</strong>, <br>
       Upvotes : ${user.questions[i].upvotes.length}, <br>
       Downvotes : ${user.questions[i].downvotes.length},
       `
     }

     const mailOptions = {
      from: 'hacktivoverflow@email.com', // sender address
      to: user.email, // list of receivers
      subject: `Hello ${user.name}`, // Subject line
      html: `<p>
      Stats For Your Questions This Week
      ${questions}
      </p>`// plain text body
    };

    transporter.sendMail(mailOptions, function (err, info) {
      if(err)
        console.log(err)
      else
        console.log(info);
    });
   })
 })
 .catch(err=>{
   console.log(err)
 })
}

// findUser()

cron.schedule('0 35 17 * * *', () => {
  findUser()
},{
  scheduled: true,
  timezone: "Asia/Jakarta"
});