const bcrypt = require('bcrypt');

const BCRYPT_SALT_ROUND = 12;

const passport = require('passport');

const User = require("../model/user");

const logger = require("../utils/logger");

const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser((user, done) => {
    done(null, user.id);
  });

passport.use(
    'register', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true,
        session: false
    }, async (req, username, password, done) => {
        logger.printLog("info",username,password);
        try {
            const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUND);
            const { name, email,phoneNumber, profilePhotoUrl } = req.body;
            const newUser = new User({
                name,
                email,
                userName:username,
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

