import css from "./About.module.css"
import { NavLink } from "react-router-dom"
import image from "../image/About.png"
import { useEffect, useState } from "react"
import { useAuth } from "../store/auth"

const About = () => {

    const[user,setUser] = useState({
        username:""
    })

    const {isloggedIn} = useAuth()
    useEffect(()=>{
  
        const fetchdata = async() =>{

        
    if (isloggedIn) {
        
   const token = localStorage.getItem('token');
    const userinfo = await fetch('http://localhost:5000/api/auth/user',{
        method:"GET",
       headers:{
        "Authorization":`Bearer ${token}`
       }        
       })
       let userData = await userinfo.json()
       setUser({
        username:userData.username
       })
    }
}
fetchdata()
},[])
    return <>
        <div className={css.aboutContainer}>

            <div className={css.aboutInfo}>
                {
                    isloggedIn?
                    <p>Welcome, {user.username}</p>
                    :
                    <p>Welcome, Alphacode</p>
                }
                
                <h1>Why Choose Us? </h1>
                <p>
                    Expertise: Our team consists of experienced IT professionals who
                    are passionate about staying up-to-date with the latest industry
                    trends.
                </p>

                <p>
                    Customization: We understand that every business is unique.
                    Thats why we create solutions that are tailored to your specific
                    needs and goals.
                </p>

                <p>
                    Customer-Centric Approach: We prioritize your satisfaction and
                    provide top-notch support to address your IT concerns.

                </p>


                <p>
                    Affordability: We offer competitive pricing without compromising
                    on the quality of our services.
                </p>

                <p>
                    Reliability: Count on us to be there when you need us. We're
                    committed to ensuring your IT environment is reliable and
                    available 24/7.
                </p>

                <div style={{ display: "flex", gap: "20px", marginTop: "30px" }}>
                    <button style={{ backgroundColor: "rgb(59, 70, 216)", border: "none", height: "30px", borderRadius: "5px" }}><NavLink to="/contact" style={{ color: "white", textDecoration: "none", fontSize: "15px" }}>Connect Now</NavLink></button>
                    <button style={{ border: "none", borderRadius: "5px", border: "2px solid white", width: "100px", height: "30px", backgroundColor: "whitesmoke" }}><NavLink to="/about" style={{ color: "black", textDecoration: "none", fontSize: "15px" }}>Learn More</NavLink></button>
                </div>
            </div>

            <div className={css.aboutImage}>
                <img src={image} width="400px" height="400px" alt="" />
            </div>

        </div>

    </>
}

export default About