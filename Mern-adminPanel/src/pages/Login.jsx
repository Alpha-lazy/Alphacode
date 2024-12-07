
import {useNavigate ,Navigate, redirect} from "react-router-dom"
import { useAuth } from "../store/auth"
import css from "./Login.module.css"
import { useState } from "react"
import { useEffect } from "react"
import Loginimage from "../image/Login-rafiki.png"
import {toast} from 'react-toastify';


const Login = () => {

    const[user,setUser] = useState({
        email:"",
        password:""
    })
    
    const {storeTokenInLS,Connect,isloggedIn,modified} = useAuth();
    modified()
    const navigate = useNavigate()
    const handleInput = (e) =>{
        let name = e.target.name;
        let value = e.target.value;

        setUser({
            ...user,
            [name] :value
        })
    }

    const handleForm = async(e) =>{
        e.preventDefault()
    
        try {
          
            const responce = await Connect("/api/auth/login",user);
            
            if (responce.ok) {

           
                toast.success("Login successfull");
                 const res_data = await responce.json()
                 storeTokenInLS(res_data.token)
              
                
                 setUser({
                    email:"",
                    password:""
                 })
                 navigate("/")
                
            }
              
            else{
                const res_data = await responce.json()
            let data  = res_data.Extradetails
            ? res_data.Extradetails
            : res_data.message
            toast.error(data)
                
            }
        } catch (error) {
       console.log("Login" , error);
        }
        
    }

    return <>

        <div className={css.container} >
            <div className={css.image}>
                <img width='400px' height="400px" src={Loginimage} alt="" />
            </div>
            <div className={css.formconatainer}>
                <form action="" className={css.form} onSubmit={handleForm} method="post">
                    <h1 className={css.h1} id="h1">Login</h1>




                    <input type="email" name="email" onChange={handleInput} value={user.email} required id="email" />
                    <label htmlFor="email">Email</label>
                    <input type="password" name="password" onChange={handleInput} value={user.password} required id="password" />
                    <label htmlFor="password">Password</label>

                    <button type="submit">Login</button>
                </form>
            </div>
        </div>

    </>
}

export default Login