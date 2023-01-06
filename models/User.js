const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    usname: {
        type: String,
        require: true
    },
    id: {
        type: String, 
        require: true,
        unique: true
    },
    pass:{
        type: String,
        require: true
    }
});

module.exports = model('Users', UserSchema);

//heroku22
