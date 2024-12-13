const Post = require("../model/post-model");


const post = async(req,res) =>{
     try {
         const data = await Post.find(req.body);

         if (data.length === 0) {
            return res.status(400).json({message:"No any post found"})
         }

         res.status(200).json(data)
         
     } catch (error) {
        res.status(500).json({message:"Internal Server Error"})
     }
}

const addpost = async(req,res) => {
    try {
     const data = req.body;
     await Post.create(data);
     res.status(200).json({message:"Post added successfully"})

    } catch (error) {
    res.status(500).json({message:"Internal Server Error"}) 
    }


}

const deletePost= async(req,res) =>{
   try {
     let id = req.params.id;
      await Post.deleteOne({_id:id})
      res.status(200).json({message:"Post deleted sccessfully"})
   } catch (error) {
    res.send(500).json({message:"Internal Server Error"}) 
   }
}

module.exports = {addpost, deletePost, post}