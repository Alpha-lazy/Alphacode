import React, { useEffect, useState } from 'react'
import { useAuth } from '../store/auth';
import {toast} from 'react-toastify';
import { Navigate, useNavigate } from 'react-router-dom';

function AdminUser() {
   const { Admintoken ,userid} = useAuth()
  const navigate = useNavigate()
   const [user, Setuser] = useState([]);
   const [loader, setLoader] = useState(true);
   const [errMessage, seterrMessage] = useState();
 
   const Adminuser = async () => {
     setLoader(true)
     const responce = await fetch('https://alphacode.onrender.com/admin/user', {
       method: 'GET',
       headers: {
         Authorization: Admintoken
       }
     
     });
 
     if (responce.ok) {
      const data = await responce.json()
     Setuser(data)
     }
     else{
      let data = await responce.json();
      seterrMessage(data.message)
     }
     
      
     setLoader(false)
 
   }
    
const deletdata = async(id) =>{

    
    if (userid !== id ) {


    const deletedData = await fetch(`https://alphacode.onrender.com/admin/user/delete/${id}`,{
      method:"DELETE",
      headers: {
        Authorization: Admintoken
      }
    })
     
    if (deletedData.ok) {
      const data = await deletedData.json();
      toast.success(data.message)
      Adminuser()
      
    }
    else{
      toast.error(data.message)
    }

  }
  else{
       toast.warn("You don't delete yourself")
  }
}

const blockedUser = async(id) =>{
  if(userid !== id){
  const blockedUser = await fetch(`https://alphacode.onrender.com/admin/user/block/${id}`, {
    method:"POST",
    headers: {
      Authorization: Admintoken
    }
    
  })

  if (blockedUser.ok) {
    const data = await blockedUser.json();
    toast.success(data.message)
    blockedUser()
    Adminuser(id)
    
  }
  else{
    const data = await blockedUser.json();
    toast.error(data.message)
  }

 

  }


  else{
    toast.warn("You don't blocked yourself")
  }
}


const editdata =  (editId) =>{
  if (userid !== editId) {
    navigate('/admin/edit',{state:{id:editId}})
  }
  else{
    toast.warn('You does not edit your self')
  }
  
}
 

   


   useEffect(() => {
     Adminuser()
     blockedUser()
 
   }, [])
  return (
     <>
        <table style={{ display: "flex",justifyContent:"center", alignItems:"center", textAlign: "center",marginTop:"100px", borderCollapse: "collapse" }}>
        <tbody style={{ backgroundColor: 'white', height: "400px", borderRadius: "10px",overflow:"auto"  }}>

          <tr style={{ height: "50px", textAlign: "center" }}>
            <th style={{ width: "157px", borderBottom: "2px solid blue", borderCollapse: "collapse" }}>Name</th>
            <th style={{ width: "157px", borderBottom: "2px solid blue", borderCollapse: "collapse" }}>Email</th>
            <th style={{ width: "157px", borderBottom: "2px solid blue", borderCollapse: "collapse" }}>Phone</th>
            <th style={{ width: "157px", borderBottom: "2px solid blue", borderCollapse: "collapse" }}>Update</th>
            <th style={{ width: "157px", borderBottom: "2px solid blue", borderCollapse: "collapse" }}>Delete</th>

          </tr>




          {
            loader ? <h4>Loading...</h4> :user.length===0 ? <h4>{errMessage}</h4> : user.map((userData, index) => {
            
              return <><tr key={index} style={{ height: "54px" }}>
                <td style={{ width: "157px" }}>{userData.username}</td>
                <td style={{ width: "157px" }}>{userData.email}</td>
                <td style={{ width: "157px" }}>{userData.phone}</td>
                <td style={{ width: "157px" }}><button style={{ width: "60px", height: "30px",border:"none", borderRadius: "30px", backgroundColor: "#2bcd2b", fontSize: "15px", cursor: "pointer", fontWeight: "500", color: "white" }} onClick={()=>{editdata(userData._id)}}>Edit</button></td>
                <td style={{ width: "157px" }}><button style={{ width: "80px", height: "30px",border:"none", borderRadius: "30px", backgroundColor: "#ff3838", fontSize: "15px", cursor: "pointer", fontWeight: "500", color: "white" }} onClick={()=>{deletdata(userData._id)}}>Delete</button></td>
                <td style={{ width: "157px" }}><button style={{ width: "80px", height: "30px",border:"none", borderRadius: "30px", backgroundColor: "#ff3838", fontSize: "15px", cursor: "pointer", fontWeight: "500", color: "white" }} onClick={()=>{blockedUser(userData._id)}}>Block</button></td>
              </tr>
              
               
              </>
            })
          }

        </tbody>
      </table>
     </>
  )
}

export default AdminUser
