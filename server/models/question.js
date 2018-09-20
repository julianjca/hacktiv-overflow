const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');

const questionSchema = new Schema({
    title:{
        type: String
    },
    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    body : {
      type : String,
    },
    comments : [{
      type : mongoose.Schema.Types.ObjectId,
      ref : 'Comment'
    }],
    upvotes : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }],
    downvotes : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }]
},{
    timestamps: true
});



const Question = mongoose.model('Question', questionSchema);
questionSchema.pre('remove', function(next) {
    // User.remove({ person: this._id }, next);
    User.update({ _id: this.user }, { "$pull": { "articles": this._id }},function(err, obj) {
        next();
    });
});
module.exports = Question;