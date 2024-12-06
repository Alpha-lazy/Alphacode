const Block = require("../model/blocked-model");
const User = require("../model/user-model");
const router = require("../router/auth-route");
const bcrypt = require("bcryptjs");



const home = async(req, res) => {
    try {
       
        if (req.modified) {
            let userdata = req.user
            res.status(200).json({token: await userdata.generateToken()})
            
        }
        else{
            let userdata = req.user
            res.status(400).json({token: await userdata.generateToken()})  
        }
       
    } catch (error) {
        res.status(500).json({message:'Internal Server Error'});
    }

};

// The post controll for registeration form

const register = async (req, res) => {
    try {
        // we request to body for data
        
        const { username, email, phone, password } = req.body;
        const userBlocked = await Block.findOne({email:email})

        // finding if userexist 

        const userExist = await User.findOne({ email: email });

        if (userExist) {
            return res.status(400).json({ message: "User is already exist" });
        }
        //  hash the password
        if (userBlocked) {
            return res.status(400).json({message:"You are blocked"})
        }

        // create and insert the data
    
            const usercreated = await User.create({ username, email, phone, password })
            res.status(201).json({message:"Registartion successfull", token: await usercreated.generateToken(), id: usercreated._id.toString() }); 
      

    } catch (error) {
   
        
        res.status(500).json({ message: 'internal server error' });
    }
}


// post request for login form

const login = async (req, res) => {
    try {
        const user = req.body;
        const userExist = await User.findOne({ email: user.email });
        

        // finde user with this email is exist in database
        if (!userExist) {
            return res.status(400).json({ message: "invalid cradentials" });
        }

        
        // if user exist in the database then compare the passsword

        const userPassword = await userExist.comparePassword(user.password);

        if (userPassword) {
            try {
            //   if user passwrod matched with database then generate token

                res.status(200).json({
                    msg: "Login successful",
                    token: await userExist.generateToken(),
                    id: userExist._id.toString()

                })
            } catch (error) {
                res.status(500).json({ message: "internal server error" })
            }
        } else {
            res.status(400).json({
                message: "invalid email or password"
            })
        }


    } catch (error) {
        res.status(500).json({ message: "internal server error" })
    }
}


const userdata = async(req,res) =>{
       const userdata = req.user;
       
       res.status(200).json(userdata)
}



module.exports = { home, register, login ,userdata};