const {Schema, model} = require('mongoose');
const date = new Date;
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const postSchema = new Schema({
      title:{
         type: String,
         require: true,
      },

      content:{
        type:String,
        require:true
      },

      date:{
        type:String,
        default:`${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}` 
      }
})

const Post = model("Post", postSchema);

module.exports = Post;