const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const kue = require('kue')
  , queue = kue.createQueue();
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD
    }
 });


module.exports = {
  create : function(req,res){
    const data = {
      name : req.body.name,
      email : req.body.email,
      password : req.body.password
    }
    User.create(data)
    .then(data=>{
      const job = queue.create('email', {
        subject: `welcome to Hacktiv Overflow, ${data.name}!`
      , to: req.body.email
      , template: 'welcome-email'
      }).save( function(err){
        if( !err ) console.log( job.id );
      });

      queue.process('email', function(job, done){
        const mailOptions = {
          from: 'hacktivoverflow@email.com', // sender address
          to: job.data.to, // list of receivers
          subject: job.data.subject, // Subject line
          html: `<p>Welcome to Hacktiv Overflow ${data.name}</p>`// plain text body
        };

        transporter.sendMail(mailOptions, function (err, info) {
          if(err)
            console.log(err)
          else
            console.log(info);
        });
      });

      job.on('complete', function(result){
        console.log('Job completed with data ', result);
        job.remove()
      }).on('failed attempt', function(errorMessage, doneAttempts){
        console.log('Job failed');
        job.remove()


      }).on('failed', function(errorMessage){
        console.log('Job failed');
        job.remove()
      })
      res.status(200).json({
        msg : "success registering user",
        data : data
      });
    })
    .catch(err=>{
      res.status(500).json({
        msg : "failed registering user",
        err : err
      });
    });
  },

  login : function(req,res){
    User.findOne({
      email : req.body.email
    })
    .then(user=>{
      const isPasswordValid = bcrypt.compareSync(req.body.password,user.password);
      if(isPasswordValid){
        jwt.sign({
          email : user.email,
          name : user.name,
          id : user._id
        }, process.env.JWT_SECRET,( err,token )=>{
          if( err ){
            res.status( 500 ).json({
              msg : err.message
            });
          }
          else{
            res.status( 200 ).json({
              msg : 'login success',
              token : token
            });
          }
        });
      }

      else{
        res.status(403).json({
          msg : "failed logging in user",
          err : err
        });
      }
    })

    .catch(err=>{
      res.status(500).json({
        msg : "failed finding user",
        err : err
      });
    });
  },

  findAll : function(req,res){
    User.find({})
    .populate('questions')
    .populate('comments')
    .exec()
    .then(data=>{
      res.status( 200 ).json({
        msg : 'success finding users',
        data : data
      });
    })
    .catch(err=>{
      res.status(500).json({
        msg : "failed finding user",
        err : err
      });
    });
  },

  facebookLogin : function(req,res){
    // console.log(req.body)
    let email = req.body.name.split(' ').join('').toLowerCase() + req.body.id +`@gmail.com`
    // console.log(email)
    User.find({
      email : email
    })
    .populate('questions')
    .populate('comments')
    .exec()
    .then(data=>{
      if(data.length===0){
        const obj = {
          name : req.body.name,
          email : email
        }
        User.create(obj)
        .then(data=>{
          const job = queue.create('email', {
            subject: `welcome to Hacktiv Overflow, ${data.name}!`
          , to: req.body.email
          , template: 'welcome-email'
          }).save( function(err){
            if( !err ) console.log( job.id );
          });

          queue.process('email', function(job, done){
            const mailOptions = {
              from: 'hacktivoverflow@email.com', // sender address
              to: job.data.to, // list of receivers
              subject: job.data.subject, // Subject line
              html: `<p>Welcome to Hacktiv Overflow ${data.name}</p>`// plain text body
            };

            transporter.sendMail(mailOptions, function (err, info) {
              if(err)
                console.log(err)
              else
                console.log(info);
            });
          });

          job.on('complete', function(result){
            console.log('Job completed with data ', result);
            job.remove()
          }).on('failed attempt', function(errorMessage, doneAttempts){
            console.log('Job failed');
            job.remove()


          }).on('failed', function(errorMessage){
            console.log('Job failed');
            job.remove()
          })
          res.status(200).json({
            msg : "success registering user",
            data : data
          });
        })
        .catch(err=>{
          res.status(500).json({
            msg : "failed registering user",
            err : err
          });
        });
      }
      else {
        User.findOne({
          email : email
        })
        .then(user=>{
            jwt.sign({
              email : user.email,
              name : user.name,
              id : user._id
            }, process.env.JWT_SECRET,( err,token )=>{
              if( err ){
                res.status( 500 ).json({
                  msg : err.message
                });
              }
              else{
                res.status( 200 ).json({
                  msg : 'login success',
                  token : token
                });
              }
            });
        })
        .catch(err=>{
          res.status(500).json({
            msg : "failed finding user",
            err : err
          });
        });
      }
    })
    .catch(err=>{
      res.status(500).json({
        msg : "failed finding user",
        err : err
      });
    });
  },

  remove : function(req,res){
    User.deleteOne({
      _id : req.params.id
    })
    .then(data=>{
      res.status( 200 ).json({
        msg : `success deleting user by id ${req.params.id}`,
        data : data
      });
    })
    .catch(err=>{
      res.status(500).json({
        msg : "failed deleting user",
        err : err
      });
    });
  },

  update : function(req,res){
    User.findOne({
      _id : req.params.id
    })
    .then(data=>{
      User.updateOne({
        email : data.email
      },{$set: {
        name : req.body.name || data.name,
        email : req.body.email || data.email,
      }})
      .then(data=>{
        res.status( 200 ).json({
        msg : `success updating user by id ${req.params.id}`,
        data : data
      });
      })
      .catch(err=>{
        res.status(500).json({
          msg : "failed updating user",
          err : err
        });
      });
    })
    .catch(err=>{
      res.status(500).json({
        msg : "failed deleting user",
        err : err
      });
    });
  },

  auth : function(req,res){
    const token = req.headers.token;
    const secret = process.env.JWT_SECRET;
    jwt.verify(token,secret,function(err, decoded) {
      if(err){
        res.status(401).json({
          msg : 'you are not authorized'
        });
      }
      else{
        User.findOne({
          email : decoded.email
        })
        .then(data=>{
          res.status(200).json({
            data
          })
        })
        .catch(err=>{
          res.status(401).json({
            msg : 'you are not authenticated'
          });
        });

      }
    });
  }
};