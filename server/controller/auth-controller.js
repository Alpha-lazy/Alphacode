const Block = require("../model/blocked-model");
const User = require("../model/user-model");
const router = require("../router/auth-route");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer")
var otp;

const home = async (req, res) => {
    try {

        if (req.modified) {
            if (req.user.isAdmin === true) {
                let userdata = req.user
                res.status(200).json({ message: "You are admin", token: await userdata.generateToken() })
            }
            else {
                let userdata = req.user
                res.status(400).json({ token: await userdata.generateToken() })
            }


        }
        else {
            let userdata = req.user
            res.status(400).json({ token: await userdata.generateToken() })
        }

    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }

};

// The post controll for registeration form

const register = async (req, res) => {
    try {
        // we request to body for data

        const { username, email, phone, password } = req.body;
        const userBlocked = await Block.findOne({ email: email })

        // finding if userexist 

        const userExist = await User.findOne({ email: email });

        if (userExist) {
            return res.status(400).json({ message: "User is already exist" });
        }
        //  hash the password
        if (userBlocked) {
            return res.status(400).json({ message: "You are blocked" })
        }

        // create and insert the data

        const usercreated = await User.create({ username, email, phone, password })
        res.status(201).json({ message: "Registartion successfull", token: await usercreated.generateToken(), id: usercreated._id.toString() });


    } catch (error) {


        res.status(500).json({ message: 'internal server error' });
    }
}

// verifyemail

const Emailverify = async (req, res) => {

    otp = Math.floor(1000 + Math.random() * 9000)



    try {

        const { username, email, phone, password } = req.body;
        const userBlocked = await Block.findOne({ email: email })

        // finding if userexist 

        const userExist = await User.findOne({ email: email });

        if (userExist) {
            return res.status(400).json({ message: "User is already exist" });
        }
        //  hash the password
        if (userBlocked) {
            return res.status(400).json({ message: "You are blocked" })
        }

        const auth = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // true for port 465, false for other ports
            auth: {
                user: "alphacode400@gmail.com",
                pass: "xxemajqizwgcoioa",
            },
        });

        const receiver = {
            from: "Alphacode",
            to: `${req.body.email}`,
            subject: "Verify Your Email Address",
            text: `
                 Hi ${username},
                 
                 Thank you for signing up with Alphacode! To complete your registration, please verify your email using the One-Time Password (OTP) below:
                 
                 Your OTP: ${otp}
                 
                 This OTP is valid for the next 10 minutes. Please enter it on the verification page to confirm your email address.
                 
                 If you didn’t request this, please ignore this email or contact us immediately at alphacode400@gmail.com.
                 We’re excited to have you onboard!
                 
                 Warm regards,
                 The Alphacode Team
                 alphacode400@gmail.com`
        }

        auth.sendMail(receiver, (error, emailResponcer) => {
            if (error) {
                res.status(200).json({ message: "please enter valide email" })
            }
            else {
                res.status(200).json({ message: "otp is send on your email" })
            }

        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" })
    }




}

// verifyOtp
const verifyOtp = (req, res) => {
    let userOtp = req.body.otp;
    console.log(userOtp === otp);

    if (userOtp != otp) {


        res.status(400).json({ message: "Incorrect otp" })
    }
    else {
        res.status(200).json({ message: "Registration successfull" })
    }
    // res.s?

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


const userdata = async (req, res) => {
    const userdata = req.user;

    res.status(200).json(userdata)
}



module.exports = { home, register, login, userdata, Emailverify, verifyOtp };