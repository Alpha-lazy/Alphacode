const mongoose = require('mongoose');
const URI = `${process.env.MONGODB_URI}`;

const connect = async() =>{
    try {
       await mongoose.connect(URI).then(
            console.log("mongodb connection successfull")
            
        )
    } catch (error) {
        console.log("Faild to connect");
        process.exit(0);
        
    }
};


module.exports = connect;