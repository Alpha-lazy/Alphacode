import css from "./Register.module.css"
import {useState} from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { useAuth } from "../store/auth";
import Signupimage from "../image/Signup.png"
import {toast} from 'react-toastify';

const Register = () =>{
   const navigate = useNavigate();
   const {storeTokenInLS,Connect,isAdmin} = useAuth();
   if (!isAdmin) {
    return  <Navigate to="/"/>
}
       const[user,setUser] = useState({
          username:"",
          email:"",
          phone:"",
          password:""
       })
       const [userOtp,setUserOtp] = useState("")
   //  const {storeTokenInLS,Connect,isAdmin} = useAuth();
   
    
       const handleInput =(e) =>{
         let name = e.target.name
         let value = e.target.value
   

      setUser({
         ...user,
         [name]:value
      })
         
       }
       const handleOtp =(e) =>{
         let value = e.target.value    
          setUserOtp(value)  
       }
       
       

       const handleForm = async(e) =>{ 
         e.preventDefault()
         const formcontainer = document.getElementById('formcontainer')
         const otpcontainer = document.getElementById('otpcontainer')
         try {
           const responce = await Connect("/api/auth/verify/email",user)

           if (responce.ok) {
               let data = await responce.json();
                toast.success(data.message)
                  formcontainer.style.display = "none"
            otpcontainer.style.display = "block"
           }
           else{
            let data = await responce.json();
            let error = data.Extradetails ? data.Extradetails : data.message
            toast.error(error)
           }
            
         //    const responce = await Connect("/api/auth/register",user);
        
        
         //  if (responce.ok) {
         //   const res_data = await responce.json()
         //   storeTokenInLS(res_data.token)
           
         //    setUser({
         //       username:"",
         //       email:"",
         //       phone:"",
         //       password:""
         //    })
         //    navigate("/")
         //    toast.success("regestritation seccessfull")
         
         //  }
         //  else{
         //    const res_data = await responce.json()
         //    let data  = res_data.Extradetails
         //    ? res_data.Extradetails
         //    : res_data.message

         //  toast.error(data )
           
         //  }
       
      
       
         
         
         }catch (error) {
            console.log("Register", error);
            
         }}
      
         

         const OtpForm = async(e) =>{
            e.preventDefault()
            try {
               
               
           
            const otpresponce = await fetch("https://alphacode.onrender.com/api/auth/verify/otp",{
                method:'POST',
                headers:{
                  "Content-Type" :"application/json"
               },
               body:JSON.stringify({
                  otp:userOtp
                  
              
                }),
         
              

               
            });
            if (otpresponce.ok) {
              
               const responce = await Connect("/api/auth/register",user);
        
              
              
               if (responce.ok) {
               //  const res_data = await responce.json()
                
               //  storeTokenInLS(res_data.token)
               
                
                 setUser({
                    username:"",
                    email:"",
                    phone:"",
                    password:""
                 })
                 navigate("/admin/user")
                 toast.success("User added seccessfully")
              
               }
               else{
                 const res_data = await responce.json()
                 let data  = res_data.Extradetails
                 ? res_data.Extradetails
                 : res_data.message
     
               toast.error(data)
                
               }
            }
            else{
               const error = await otpresponce.json();
               toast.error(error.message)
               
               }
            } catch (error) {
               toast.error("Internal server error")
               console.log(error);
               
            }
         }

      
 
     
   
            
         
       

    return <>
             <div className={css.container} >
                   <div className={css.image}>
                          <img width='400px' height="400px" src={Signupimage} alt="" />
                   </div>
                <div className={css.formconatainer} id="formcontainer"  >
                <form action="" className={css.form} onSubmit={handleForm}  method="post">
                         <h1 className={css.h1} id="h1">Add User</h1>
                       
                      
                       
                        
                         <input type="text" name="username" value={user.username} onChange={handleInput} required id="name"/>
                         <label htmlFor="name">User Name</label>
                         <input type="email" name="email" value={user.email} onChange={handleInput} required  id="email"/>
                         <label htmlFor="email">Email</label>
                         <input type="number" name="phone" value={user.phone} onChange={handleInput}required   id="phone" />
                         <label htmlFor="phone">Phone</label>
                         <input type="password" name="password" value={user.password} onChange={handleInput} required id="password" />
                         <label htmlFor="password">Password</label>

                         <button type="submit">Add User</button>
                </form>
                </div>

                <div className={css.formconatainer} id="otpcontainer" style={{display:"none",marginTop:"75px"}} >

                <form action="" className={css.form} onSubmit={OtpForm}  method="post">
                         <h1 className={css.h1} id="h1">Email Verification</h1>
                       
                      
                       
                        
                         <input type="text" name="username" maxLength="4" value={userOtp.otp} onChange={handleOtp} required id="otp"/>
                         <label htmlFor="name">Enter otp</label>
                       

                         <button type="submit">Verify</button>
                </form>
                </div>
             </div>
           
           </>
    }
    
    export default Register