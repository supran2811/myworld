const passport = require('passport');
const { validationResult } = require("express-validator/check");
const logger = require('../utils/logger').getChildLogger("auth");
const User = require("../model/user");

exports.createUser = async (req, res, next) => {
    const err = validationResult(req);
    if(!err.isEmpty()) {
        const errorMessage = err.array()[0].msg;
        return res.status(422).send({message:errorMessage , validationErrors:err.array()});
    }
    passport.authenticate("register" , (err,user,info) => {
        if(err) {
            logger.printLog("error","Error while registering "+err);
            return res.status(500).send({message:"Unknown System Error",error:err});
        }
        else {
            req.logIn(user , error => {
                if(error) {
                    return next(error);
                }
               return res.status(201).send({ message: 'user created' });
            });
        }
    })(req,res,next);
}

exports.loginUser = (req, res, next) => {
    const data = req.body;
    return res.status(200).json({ message: 'User Logged in' });
}