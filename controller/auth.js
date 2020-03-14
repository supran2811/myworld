const passport = require('passport');
const { validationResult } = require("express-validator/check");
const logger = require('../utils/logger').getChildLogger("auth");
const User = require("../model/user");
const jwtSecret  = require("../configs/jwtConfig");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.createUser = async (req, res, next) => {
    const err = validationResult(req);

    if(!err.isEmpty()) {
        const errorMessage = err.array()[0].msg;
        return res.status(422).send({message:errorMessage , validationErrors:err.array()});
    }

    passport.authenticate("register" , (err,user,info) => {
        if(err) {
            logger.printLog("error","Error while registering "+err);
            return res.status(500).send({message:"Unknown System Error"});
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
    const err = validationResult(req);
    if(!err.isEmpty()) {
        const errorMessage = err.array()[0].msg;
        return res.status(422).send({message:errorMessage , validationErrors:err.array()});
    }
    passport.authenticate("login" , (err,user,info) => {
        if(err) {
            logger.printLog("error","Error while login "+err);
            return res.status(500).send({message:"Unknown System Error"});
        }
        else if(info) {
            return res.status(400).send(info);
        }
        else {
            req.login(user , error => {
                console.log("Inside req login",user,error);
                if(error) {
                    return next(error);
                }
                else {
                    const token = jwt.sign({id:user.userName} , jwtSecret.secret,{expiresIn:'1h'});
                    return res.status(200).send({
                        token,
                        email:user.email,
                        userName:user.userName,
                        name:user.name
                    });
                }
            })
        }
    })(req,res,next);
}