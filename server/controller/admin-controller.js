
const User = require('../model/user-model');
const contact = require('../model/contact-model');
const Block = require('../model/blocked-model');

const userdata = async(req,res) =>{
    try {
        const data = await User.find({},{password:0});
         
        if (data.lenght === 0) {
            res.status(404).json({message:"No any user exist"})
        }
         res.status(200).json(data)
               
    } catch (error) {
          res.status(500).json({message:"Internal server error"})
    }
        
}

   
 const deleteUser = async(req,res) =>{
    try {
        let id = req.params.id;
        await User.deleteOne({_id:id});
        res.status(200).json({message:"User deleted successfully"})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error"}) 
    }       
 }   


 const editUser = async(req,res) =>{
    try {
        let data = req.body;
        let id = req.params.id;
     
        
        await User.updateOne({_id:id} , {username:data.username, email:data.email, phone:data.phone});

        if (User.modifiedCount === 0) {
           return  res.status(404).json({message:"Document not found or no changes made"})
        }
    res.status(200).json({message:'Document updated successfully'});

    } catch (error) {
       console.log(error);
       res.status(500).json({message:"Internal Server Error",error:error}) 
        
    }
 }

  const blockUser = async(req,res) => {
    try {
        let id = req.params.id;
        const data = await User.findOne({_id:id});
         await Block.insertMany(data);
         res.status(200).json({message:"User is blocked and deleted"})

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error"})
    }

  }

  const blockedData = async(req,res) =>{
    try {
          const data = await Block.find({});
          if (data.lenght === 0) {
            res.status(404).json({message:"No any blocked user exist"})
        }
          res.status(200).json(data);

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error"})
        
    }
  }

  const unblockUser = async(req,res) =>{ 
    try {

       let id  = req.params.id
        await Block.deleteOne({_id:id});
         res.status(200).json({message:"User unblocked successfully"});

    } catch (error) {
        console.log(error);
        res.status(200).json({message:"Internal server error"}); 
    }

    
  }
 


 const contactdata = async(req,res) => {
    try {
        const contactData = await contact.find({});
        
        if (contactData.length === 0) {
             res.status(404).json({message:"No any content found"})
             
        }
        else{
            res.status(200).json(contactData)

        }

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error"}) 
    }
    }

  const deleteContact = async(req,res) =>{
    try {
        let id = req.params.id;
        
        await contact.deleteOne({_id:id});
        res.status(200).json({message:"Contact deleted successfully"})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error"})
        
    }
       
            
          

  }



module.exports = {userdata,contactdata,deleteUser,editUser,deleteContact,blockUser,blockedData,unblockUser};