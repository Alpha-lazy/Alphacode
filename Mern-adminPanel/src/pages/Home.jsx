import React, { useEffect }  from "react";
import { NavLink } from "react-router-dom";
import css from "./Home.module.css"
import homeImage from "../image/home-img.png"
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
const Home = () =>{
  const { isAdmin , Admintoken} = useAuth()
     
      const token = localStorage.getItem('token')
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
            // userid = decodeToken(data.token).userId;
            toast.success("You are admin")
        }
        else{
          let data = await responce.json()
          localStorage.setItem('token',data.token);
          isAdmin= false;
          

        }
       
    }

     useEffect(()=>{
     
        modified()
     },[])

    return <>
            <div className={css.container}>

             <section className={css.infocontainer}>
                <div className={css.info}>
                  <p>We are the World best it Company</p>
                  <h1 style={{color:"white", fontSize:"30px",margin:"0px"}}>Welcome to Alpha Code</h1>
                  <p>Are you ready to take your business to the next level with
                cutting-edge IT solutions? Look no further! At Thapa Technical,
                we specialize in providing innovative IT services and solutions
                tailored to meet your unique needs.</p>
                  <div className={css.button} style={{gap:"20px",display:"flex"}}>
                    <button className={css.b1} style={{backgroundColor:"rgb(59, 70, 216)", height:"30px", borderRadius:"5px"}}><NavLink to="/contact" style={{color:"white", textDecoration:"none", fontSize:"15px"}}>Connect Now</NavLink></button>
                    <button className={css.b2} style={{ borderRadius:"5px",width:"100px",backgroundColor:"whitesmoke"}}><NavLink to="/about" style={{color:"black",textDecoration:"none",fontSize:"15px"}}>Learn More</NavLink></button>
                  </div>
                </div>

              <div className={css.image}>
                <img src={homeImage} alt="" width="350px"
                height="350px" />
              </div>
             </section>

            </div>
             
       
       </>
}

export default Home