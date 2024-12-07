import {  createContext, useContext, useState } from "react";
import { isExpired, decodeToken } from "react-jwt";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
var admin = false
var userid;


export const AuthContext = createContext();

export const AuthProvider = ({children}) =>{

    // Making the state token for logout and login
   const navigate = useNavigate()
    const[token,setToken] = useState(localStorage.getItem("token"))

    const Admintoken = `Bearer ${token}` 
    
    const storeTokenInLS = (serverToken) =>{
        setToken(serverToken)
        return localStorage.setItem("token",serverToken);

    };

    // THis operator is used to convert the value in boolean
    const isloggedIn = !!token;
    if (isloggedIn) {
        admin = decodeToken(token).isAdmin  ;
        userid = decodeToken(token).userId;
    }
     else{
      admin = false
     }
     const modified = async() => {
        const responce = await fetch('https://alphacode.onrender.com/api/auth/', {
               method:"GET",
               headers:{
                 Authorization:Admintoken,
               }

        })
        
        if (responce.ok) {
            let data = await responce.json()
            localStorage.setItem('token',data.token);
            isAdmin = true;
            admin = decodeToken(data.token).isAdmin  ;
            userid = decodeToken(data.token).userId;
            toast.success("You are admin")
            
        }
        else{
          let data = await responce.json()
          localStorage.setItem('token',data.token);
          isAdmin= false;   

        }
        navigate(0)
        
    }
      
     const isAdmin = admin
    
    // this is the function for logout page
    const LogoutUser = () =>{
            setToken("")
          
            return localStorage.removeItem('token');
    }

    // making function for the fetching the data from backend

    const Connect = async(path,user) => {
          return  await fetch(`https://alphacode.onrender.com${path}` , {
            method:"POST",
            headers:{
                "Content-Type" :"application/json"
            },
            body: JSON.stringify(user)
          })
    }

    return (
        <AuthContext.Provider value={{storeTokenInLS,LogoutUser,isloggedIn,Connect,isAdmin,Admintoken,userid,modified}}>
            {children}
        </AuthContext.Provider>
    );
}
export const useAuth = () =>{
  return  useContext(AuthContext);
}

