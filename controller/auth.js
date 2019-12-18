const logger = require('../utils/logger').getChildLogger("auth");

exports.createUser = (req,res,next) => {
    const userData = req.body;
    logger.printLog("debug",userData);
    return res.status(201).json({message: 'User Created Successfully!!'});
}

exports.loginUser = (req,res,next) => {
    const data = req.body;
    logger.printLog("debug",data);
    return res.status(200).json({message:'User Logged in'});
}