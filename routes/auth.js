
// const { body } = require("express-validator"); 

const { createUser  , loginUser} = require('../controller/auth');

module.exports = app => {

    app.post("/signup" , createUser);

    app.post("/login" , loginUser);

}