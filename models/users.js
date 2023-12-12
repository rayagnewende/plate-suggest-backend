const mongoose = require('mongoose'); 

const UserSchema = mongoose.Schema({
    username:String, 
    email:String, 
    password:String, 
    token:String,
    plates:[{type:mongoose.Schema.Types.ObjectId, ref:"plates"}],
}); 

const User = mongoose.model('users', UserSchema); 

module.exports = User ; 