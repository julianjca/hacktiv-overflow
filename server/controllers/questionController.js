const Question = require('../models/question');
const mongodb = require('mongodb');
const User = require('../models/user');

module.exports = {
  create : function(req,res){
    const input = {
      title : req.body.title,
      body : req.body.body,
      user : req.userData.id
    };
    Question.create(input)
    .then(data=>{
      User.updateOne({
        _id : data.user
      },{
        $push : {
          questions : data._id
        }
      })
      .then(response=>{
        res.status(200).json({
          msg : "success adding question",
          data : data
        });
      })
      .catch(err=>{
        res.status(500).json({
          msg : "failed adding question",
          err : err
        });
      });
    })
    .catch(err=>{
      res.status(500).json({
        msg : "failed adding question",
        err : err
      });
    });
  },

  remove : function(req,res){
    Question.findOne({
      _id : req.params.id,
      user : req.userData.id
    })
    .then(data=>{
      data.remove();
      res.status( 200 ).json({
        msg : `success deleting question by id ${req.params.id}`,
        data : data
      });
    })
    .catch(err=>{
      res.status(500).json({
        msg : "failed deleting question",
        err : err
      });
    });
  },

  update : function(req,res){
    Question.findOne({
      _id : req.params.id,
      user : req.userData.id
    })
    .then(data=>{
      Question.updateOne({
        _id : req.params.id
      },{$set: {
        "title" : req.body.title || data.title ,
        "body" : req.body.body || data.body,
      }
      })
      .then(data=>{
        res.status( 200 ).json({
        msg : `success updating question by id ${req.params.id}`,
        data : data
      });
      })
      .catch(err=>{
        res.status(500).json({
          msg : "failed updating question",
          err : err
        });
      });
    })
    .catch(err=>{
      res.status(500).json({
        msg : "failed deleting question",
        err : err
      });
    });
  },

  findAll : function(req,res){
    Question.find({})
    .populate({
      path :'comments',
      model :'Comment',
      populate :{
        path : 'user',
        model : 'User'
      }
    })
    .populate('user')
    .exec()
    .then(data=>{
      res.status( 200 ).json({
        msg : 'success finding questions',
        data : data
      });
    })
    .catch(err=>{
      res.status(500).json({
        msg : "failed finding questions",
        err : err
      });
    });
  },

  findOne : function(req,res){
    Question.find({
      _id : req.params.id
    })
    .populate({
      path :'comments',
      model :'Comment',
      populate :{
        path : 'user',
        model : 'User'
      }
    })
    .populate('user')
    .exec()
    .then(data=>{
      res.status( 200 ).json({
        msg : 'success finding question',
        data : data
      });
    })
    .catch(err=>{
      res.status(500).json({
        msg : "failed finding question",
        err : err
      });
    });
  },

  upvote : function(req,res){
    console.log(req.userData)
    Question.findOne({
      _id : req.params.id
    })
    .then(data=>{
      Question.updateOne({
        _id : req.params.id
      },{
        $set: {
        title : req.body.title || data.title,
        body : req.body.body || data.body,
      },
        $push : {
          upvotes : req.userData.id
        }
      })
      .then(data=>{
        res.status( 200 ).json({
        msg : `success updating question by id ${req.params.id}`,
        data : data
      });
      })
      .catch(err=>{
        res.status(500).json({
          msg : "failed upvoting question",
          err : err
        });
      });
    })
    .catch(err=>{
      res.status(500).json({
        msg : "failed upvoting question",
        err : err
      });
    });
  },

  downvote : function(req,res){
    Question.findOne({
      _id : req.params.id
    })
    .then(data=>{
      Question.updateOne({
        _id : req.params.id
      },{
        $set: {
        title : req.body.title || data.title,
        body : req.body.body || data.body,
      },
        $push : {
          downvotes : req.userData.id
        }
      })
      .then(data=>{
        res.status( 200 ).json({
        msg : `success updating comment by id ${req.params.id}`,
        data : data
      });
      })
      .catch(err=>{
        res.status(500).json({
          msg : "failed updating comment",
          err : err
        });
      });
    })
    .catch(err=>{
      res.status(500).json({
        msg : "failed deleting comment",
        err : err
      });
    });
  }
};