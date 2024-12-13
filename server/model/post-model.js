const {Schema, model} = require('mongoose');
const date = new Date();
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

      fileurl:{
        type:String,
        require:true
      },

      date:{
        type:String,
        default:date.toLocaleString("en-US", {
          timeZone: "Asia/Kolkata",
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      }
})

const Post = model("Post", postSchema);

module.exports = Post;