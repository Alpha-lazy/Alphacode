const { model, Schema } = require("mongoose");


const serviceSchema = new Schema({
    service:{type:String , require:true},
    description:{type:String , require:true},
    price:{type:String , require:true},
    provides:{type:String , require:true},
})

const Service = model('Service' , serviceSchema);

module.exports = Service;