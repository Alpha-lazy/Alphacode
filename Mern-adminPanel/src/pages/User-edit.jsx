import React, { useState } from 'react'
import css from './Useredit.module.css'
import { useAuth } from '../store/auth'
import { toast } from 'react-toastify'
import { useLocation, useNavigate } from 'react-router-dom'
import updateimage from '../image/Update-pana.png'

function Useredit() {
  const {Admintoken,userid} = useAuth()
const {state} = useLocation()
const navigate = useNavigate()
const { id } = state;


  const[user,setUser] = useState({
    username:"",
    email:"",
    phone:""
  })

    const handleInput = (e) =>{
       let name = e.target.name;
       let value = e.target.value;

       setUser({
        ...user,
        [name]:value
     })
    
     
    }
   
    const handleForm = async(e) =>{
       e.preventDefault();
        
       const responce = await fetch(`http://localhost:5000/admin/user/edit/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: Admintoken,
            "Content-Type" :"application/json"
        },
        body: JSON.stringify(user)

        
       })

       if (responce.ok) {
        let data  = await responce.json()
        toast.success(data.message)
        navigate('/admin/user', )
        
       } else {
       toast.error("Document is not edited")
       console.log(await responce.json());
       
       }

    
    }
    return (
        <>
            <div className={css.container} >
                <div className={css.image}>
                    <img width='400px' height="400px" src={updateimage} alt="" />
                </div>
                <div className={css.formconatainer}>
                    <form action="" className={css.form} onSubmit={handleForm} method="post">

                        <input type="text" name="username" value={user.username} onChange={handleInput} required id="name" />
                        <label htmlFor="name">Update Name</label>
                        <input type="email" name="email" value={user.email} onChange={handleInput} required id="email" />
                        <label htmlFor="email">Update Email</label>
                        <input type="number" name="phone" value={user.phone} onChange={handleInput} required id="phone" />
                        <label htmlFor="phone">Update Phone</label>

                        <button type="submit">Update</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Useredit
