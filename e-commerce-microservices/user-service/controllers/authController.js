const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');


exports.register = async(req , res) => {
    try {
        const {name , email , password} = req.body;

        let user = await User.findOne({email})
        if (user) return res.status(400).json({message : "User Already Exists"})

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password , salt);

        user = new User ({name , email , password : hashedPassword})
        await user.save();

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

       return res.status(201).json({message  : 'User Registerd Succesfully '})
        
    } catch (error) {

        res.status(500).json({message : "Server Error"})
        
    }
}


exports.login = async(req , res) => {
    try {

        const {email , password} = req.body;

        const user = await User.findOne({email});

        if(!user) return res.status(400).json({message : "Invalid Credentials"});

        const isMatch = await bcrypt.compare(password , user.password);
        if(!isMatch) return res.status(400).json({message : 'Invalid Credentials'});


        const token = jwt.sign ({userId : user._id} , process.env.JWT_SECRET , {expiresIn : "1h"});
       return  res.json({token})
        
    } catch (error) {
        console.error("Login Error:", error.message); // Log the actual error
        return res.status(500).json({ message: "Server Error", error: error.message }); // Return error details
    }
}