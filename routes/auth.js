
const { check, body } = require('express-validator');
const { isMobilePhone } = require('validator');
const User = require("../model/user");

const { createUser, loginUser } = require('../controller/auth');

module.exports = app => {

    app.post("/signup", [check('name').isLength({ min: 4 }).withMessage("Name should be more than 3 letter"),
    check('email').isEmail().normalizeEmail().withMessage("Please enter a valid email!")
        .custom(async value => {
            const usr = await User.findOne({ email: value });
            if (usr) {
                return Promise.reject('User already exist!!');
            }
        }),
    check('username').isLength({ min: 4 }).withMessage("Username should be more than 4 letter")
        .custom(async value => {
            const usr = await User.findOne({ userName: value });
            if (usr) {
                return Promise.reject('Username already taken!!');
            }
        }),
    check('password').isLength({ min: 8 }).withMessage("Password must be atleast 8 letter").custom(value => {
        const pattern = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
        console.log("Pattern test", pattern.test(value), value);
        if (!pattern.test(value)) {
            throw new Error('Password must have at least one number,special character');
        }
        else return true
    }),
    check('phoneNumber').custom(value => {
        if (value && !isMobilePhone(value)) {
            throw new Error("Phone number is not valid!!");
        }
        else return true;
    })], createUser);

    app.post("/login", loginUser);

}