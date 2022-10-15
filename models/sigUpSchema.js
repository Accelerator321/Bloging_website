const mongoose = require('mongoose');
const signUpSchema = new mongoose.Schema({
    email: {type:String,
        unique:true,
        require:true,
        trim:true
    },
    password: String,
    username: {type:String,
        unique:true,
        trim:true,
        lowercase:true,
        
    },
    avatar: String,
});

const signUp = mongoose.model('signUp', signUpSchema);

module.exports = signUp;