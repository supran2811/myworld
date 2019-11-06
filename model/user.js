const { model , Schema } = require('mongoose');

const userSchema = new Schema({
    name: {
        type:String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    password: {
        type:String,
        require: true
    },
    phoneNumber: String,
    country: {
        type: String,
        required: true
    }

},{timestamps:true});

module.exports = new model(userSchema);