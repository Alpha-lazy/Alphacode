import React, { useEffect, useState } from 'react';
import css from './Contact.module.css'
import { useAuth } from '../store/auth';
import Contactimage from '../image/Contact.png'
import {toast} from 'react-toastify';
function Contact() {
   const {Connect,isloggedIn,modified} = useAuth();
   const token = localStorage.getItem('token')
 
    const[contact,setContact] = useState({
        username:"",
        email:"",
        message:"",
    })
     const handleInput = (e) =>{
       let name = e.target.name;
       let value = e.target.value;
        
       setContact({
        ...contact,
        [name]:value,
       })
       
     }
    useEffect(()=>{
      if (isloggedIn) {
    
        modified()
      } 
   const data = async() =>{
    if (isloggedIn) {
      
   
    const userinfo = await fetch('https://alphacode.onrender.com/api/auth/user',{
      method:"GET",
     headers:{
      "Authorization":`Bearer ${token}`
     }        
     })
     let userData = await userinfo.json()
     setContact({
      username:userData.username,
      email:userData.email
     })
    }
    else{
      setContact({
       username:"",
       email:""
      })
    }
     
   }
   
   data()
  
        },[])
     const handleForm = async(e) =>{
       e.preventDefault()
    try {
      
       let responce = await Connect('/api/contact', contact)

       if (responce.ok) {
        toast.success("Message send succesfull")
             setContact({
              message:"",
             });
       }
      } catch (error) {
        toast.error("Message send unsuccesfull");
         console.log(error);
         
      }
        
     }


  return (
    <>
      <div className={css.container} >
        <div className={css.image}>
        <img width='400px' height="400px" src={Contactimage} alt="" />
        </div>
        <div className={css.formconatainer}>
          <form action="" className={css.form} onSubmit={handleForm} method="post">
            <h1 className={css.h1} id="h1">Contact Us</h1>




            <input type="text" name="username" value={contact.username} onChange={handleInput} required id="name" />
            <label htmlFor="name">Your Name</label>
            <input type="email" name="email" value={contact.email} onChange={handleInput} required id="email" />
            <label htmlFor="email">Email</label>
            <textarea id="message" name="message" value={contact.message}  onChange={handleInput} required rows="4" cols="60" placeholder='Type your message'></textarea>
            <label htmlFor="message" className='messageLabel' style={{marginTop:"-142px"}}>Message</label>
          

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Contact
