import React, { useState } from 'react'
import css from './Add-post.module.css'
import { useAuth } from '../store/auth'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function Addpost() {
    const {Connect} = useAuth()
    const navigate = useNavigate()
    const [image, setImage] = useState("")
    const [postData, setPostData] = useState({
        title:"",
        content:"",
        fileurl:""
    })
   
    const  handleImage = (e) =>{
        const file = e.target.files[0];

   
        // if (file) {
             const reader = new FileReader();
             
             reader.onload = (e) =>{
              
                
                setImage(e.target.result);
                setPostData({
                    fileurl:image
                })
                
             };

             reader.onerror = (e) =>{
                toast.error("Error reading file.")
                console.error("File reading error:", e);
             };

             reader.readAsDataURL(file)
             
        // }

        // else{

        // }
        console.log("this is the image state: ",image);
        
      }



    const handleInput = (e) => {
          let name = e.target.name;
          let value = e.target.value;

         
          setPostData({
            ...postData,
            [name]:value
          })

         
    }
    
    
   
    const handleForm = async(e) =>{
          e.preventDefault();
          try {
            const responce = await Connect("/api/post/addpost", postData);
            
            if (responce.ok) {
                let data = await responce.json()
                console.log(data,"hi");
                navigate("/")
              return toast.success(data.message);
               
            }
            else{
               console.log('by');
               
                toast.error("Post is not added")
            }
            
            

          } catch (error) {
              toast.error("Internal Server Error")
          }
    }
    return (
        <>
            <div className={css.container} >
                <div className={css.formconatainer}>
                    <form action="" className={css.form} onSubmit={handleForm} method="post">

                        <input type="text" name="title" value={postData.title}  onChange={handleInput} required id="title" placeholder='Title' />
                        <label htmlFor="title">Title</label>
                        <input type="file" name="fileurl"  onChange={handleImage} required id="fileurl" placeholder='Title' />
                        <label htmlFor="fileurl">Upload image</label>
                        <textarea name="content" value={postData.content}  onChange={handleInput} required rows="4" cols="60" placeholder='Type your content here...'></textarea>
                        <label htmlFor="content" className='messageLabel' style={{ marginTop: "-229px" }}>Your Content</label>


                        <button type="submit">Add</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Addpost
