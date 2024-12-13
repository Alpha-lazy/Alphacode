import React, { useState } from 'react'
import css from './Add-post.module.css'
import { useAuth } from '../store/auth'
import { toast } from 'react-toastify'

function Addpost() {
    const {Connect} = useAuth()
    const {postData, setPostData} = useState({
        title:"",
        content:""
    })

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
            const responce = Connect("/api/post/addpost", postData);
            
            if (responce.ok) {
                let data = await responce.json()
               return toast.success(data.message);
            }
            toast.error("Post is not added")
          } catch (error) {
              toast.error("Internal Server Error")
          }
    }
    return (
        <>
            <div className={css.container} >
                <div className={css.formconatainer}>
                    <form action="" className={css.form} onSubmit={handleForm} method="post">

                        <input type="text" name="title" value={postData.username} onChange={handleInput} required id="title" />
                        <label htmlFor="name">Title</label>
                        <textarea id="message" name="content" value={postData.message} onChange={handleInput} required rows="4" cols="60" placeholder='Type your message'></textarea>
                        <label htmlFor="message" className='messageLabel' style={{ marginTop: "-142px" }}>Your Content</label>


                        <button type="submit">Add</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Addpost
