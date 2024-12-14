import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, Navigate } from "react-router-dom";
import css from "./Home.module.css"
import homeImage from "../image/home-img.png"
import { useAuth } from "../store/auth";
import { MdDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { toast } from "react-toastify";



const Home = () => {
  const { isAdmin, Admintoken, modified, isloggedIn, Connect } = useAuth()
  const [data, setData] = useState([])
  const [message, setMessage] = useState()
  const [isloading, setLoading] = useState(true)
  const [image, setImage] = useState({
    title:"",
    content:"",
    fileurl:""
  })
  const navigate = useNavigate()
  if (!isloggedIn) {
    return <Navigate to="/login" />
  }

 
  

   const fetchdata = async() => {
    setLoading(true)
        const postData = await fetch('https://alphacode.onrender.com/api/post/',{
          method:"GET",
          headers:{
            "Content-Type" :"application/json"
        },
        });
        const data = await postData.json();
        
        if (postData.ok) {
             setData(data);
             setLoading(false)
        }
        else{
          setData([])
          setMessage(data.message)
          setLoading(false)
        }
   }
   const deletePost = async(id) =>{

       const responce = await fetch(`https://alphacode.onrender.com/api/post/deletepost${id}`, {
        method:"DELETE",
        headers:{
          "Content-Type" :"application/json"
        },
       })

       if (responce.ok) {
           let data = await responce.json();
           toast.success(data.message);
           fetchdata()
       }
       else{
        setData([])
        let data = await responce.json();
        toast.error(data.message);
       }
   }

   const showImage = async(id) =>{
    document.getElementById('imgcontainer').style.display = 'block'
    const postData = await fetch(`https://alphacode.onrender.com/api/post/showpost${id}`,{
      method:"GET",
      headers:{
        "Content-Type" :"application/json"
    },
    
    });
    
    
    if (postData.ok) {
      const res_data = await postData.json();
      console.log(res_data);
      
      setImage({
        title:res_data.title,
        content:res_data.content,
        fileurl:res_data.fileurl
      })
         
         
    }
    else{
     setImage({
      title:"",
      content:"",
      fileurl:""
     })
      setMessage(data.message)
       document.getElementById('imgcontainer').style.display = 'none'
      
    }
   }
 
  console.log(image);
  


  useEffect(() => {
    if (isloggedIn) {
      modified()

    }
    fetchdata()
    
  }, [])




  return <>
      <button style={isAdmin?{display:"block"}:{display:"none"}} className={css.addPost} id="addPost" onClick={()=>{return navigate('/addpost')}}>
      <IoMdAdd style={{width:"30px", height:"30px"}} />
      </button>
      <div style={{display:"flex", justifyContent:"center",alignItems:"center"}}>
      <div className={css.imgcontainer} id="imgcontainer">
               <h2 className={css.postHeading}>{image.title}</h2>
               {image.fileurl===""||image.fileurl===null?"":<img src={image.fileurl} width="500px" style={{margin:"auto"}} height="500px" alt="" />}
               <p style={{whiteSpace:"pre-wrap", width:"700px",overflowWrap:"break-word" ,color:"white"}}>{image.content}</p>
              
      </div>
      </div>
    <div className={css.body}>

  
   
      <div className={css.container}>

        {/* <section className={css.infocontainer}>
                <div className={css.info}>
                  <p>We are the World best it Company</p>
                  <h1 style={{color:"white", fontSize:"30px",margin:"0px"}}>Welcome to Alpha Code</h1>
                  <p>Are you ready to take your business to the next level with
                cutting-edge IT solutions? Look no further! At Alpha Code,
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
             </section> */}

       {isloading
         ?<h3 style={{color:"white"}}>Loading...</h3>
         :data.length === 0 
         ?<h3 style={{color:"white"}}>{message}</h3>
         :data.map((postData, index)=>{
         return<div className={css.postContainer} onClick={()=>{showImage(postData._id)}} key={index}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
           <div style={{color:"#767676", fontSize:"15px"}}>{postData.date}</div>
        
             <MdDelete  id="delete" onClick={()=>{deletePost(postData._id)}}  className={css.delete}  style={isAdmin?{ display:"block" ,color: "rgb(185 183 183)", width: "25px", height: "25px"}:{display:"none"}  } />
             
          </div>
          <h2 className={css.postHeading}>{postData.title}</h2>

        <div style={{display:"flex",justifyContent:"space-between"}}>
          <p className={css.postMessage} style={{whiteSpace:"pre-wrap", width:"700px",overflowWrap:"break-word" }}>{postData.content}</p>
          <img src={postData.fileurl} alt="" width="150px" height="150px" style={{marginLeft:"10px"}} />
        </div>
        </div>})
        }
        


         


      </div>
    </div>


  </>
}



export default Home