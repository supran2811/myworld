const bcrypt = require('bcrypt');

const _ = require('lodash');

const { isEmail } = require('validator');

const BCRYPT_SALT_ROUND = 12;

const passport = require('passport');

const User = require("../model/user");

const logger = require("../utils/logger");

const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser((user, done) => {
    if(user) {
        done(null , user._id);
    }
    else {
        done(null);
    }
});

// This is for registration of user
passport.use(
    'register', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true,
        session: false
    }, async (req, username, password, done) => {
        logger.printLog("info", username, password);
        try {
            const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUND);
            const { name, email, phoneNumber, profilePhotoUrl } = req.body;
            const newUser = new User({
                name,
                email,
                userName: username,
                phoneNumber,
                password: hashedPassword,
                profilePhotoUrl
            });
            const user = await newUser.save();
            return done(null, user);
        } catch (error) {
            done(error);
        }
    })
);


// This is for logging in the user
passport.use('login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    session: false
}, async (username, password, done) => {
    let user = null;
    try {
        if (isEmail(username)) {
            user = await User.findOne({ email: username });
            if (!user) {
                return done(null, false, { message: "Invalid email" });
            }
        }
        else {
            user = await User.findOne({ userName: username });
            if (!user) {
                return done(null, false, { message: "Invalid username" });
            }
        }
        if (user) {
            const isValidPassword = await bcrypt.compare(password, user.password);
            if(!isValidPassword) {
                return done(null , false, { message : "Not Authenticated!!!"});
            }
            return done(null , user);
        }
    } catch (error) {
        done(error);
    }
}));