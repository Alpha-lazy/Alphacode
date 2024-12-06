const {Schema,model} = require('mongoose');

const blockedSchema  = new Schema({

      email:{
        type:String,
        require:true,
      }
})


const Block = model('Blocked' , blockedSchema);

module.exports = Block;