const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



const userSchema = new mongoose.Schema({
      username:{
        type:String,
        require:true
      },
      email:{
        type:String,
        require:true,
      },
      phone:{
        type:String,
        require:true,
      },
      password:{
        type:String,
        require:true
      },
      isAdmin:{
        type:Boolean,
        default:false
      },
      date:{
        type:String,
        default:new Date,
      
      }

});

// userschema is run before the saving data in database like middleweare

userSchema.pre("save", async function (next) {
   const user = this;
   
   if (!user.isModified("password")) {
     next()
   }

   try {
    const saltround = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(user.password, saltround);
    user.password = hash_password;
   } catch (error) {
     next(error)
   }
})
// this is the instance method for compare the password

userSchema.methods.comparePassword = async function (password) {
     return bcrypt.compare(password,this.password);
}

// this is the instanace method for generating token
userSchema.methods.generateToken = async function () {
   try {
     return jwt.sign({
         userId : this._id.toString(),
         email : this.email,
         isAdmin: this.isAdmin
     },
     process.env.JWT_SECRET_KEY,
     {
      expiresIn:'30d'
     }
    ) 
   } catch (error) {

    console.log(error);
    
     
   }
}

const User = mongoose.model("User",userSchema);

module.exports = User; 