const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : {type : String },
    email : {type: String},
    username : {type: String},
    password: {type: String},
    age : {type: Number},
    member : {type: Boolean},
    profile : {type: String, default: 'profile.jpg'}
});

module.exports = mongoose.model('user', userSchema);