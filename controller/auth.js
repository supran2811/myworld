
exports.createUser = (req,res,next) => {
    const userData = req.body;
    console.log("User data entered ",userData);
    return res.status(201).json({message: 'User Created Successfully!!'});
}

exports.loginUser = (req,res,next) => {
    const data = req.body;
    console.log("User login credentials are ",data);
    return res.status(200).json({message:'User Logged in'});
}