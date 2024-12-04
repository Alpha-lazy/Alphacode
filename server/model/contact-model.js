const {Schema,model} = require('mongoose');

const contactSchema  = new Schema({
    username:{
        type:String,
        require:true
      },
      email:{
        type:String,
        require:true,
      },
      message:{
        type:String,
        require:true,
      },
      date:{
        type:String,
        default:Date
      }
})


const contact = model('Contact' , contactSchema);

module.exports = contact;