import React, { useEffect, useState } from 'react'
import { useAuth } from '../store/auth';
import {toast} from 'react-toastify';



function Admincontact() {
  const { Admintoken } = useAuth()

  const [contactData, setcontactData] = useState([]);
  const [errMessage, seterrMessage] = useState();
  const [loader, setLoader] = useState(true)

  const contactdata = async () => {
    setLoader(true)
   setcontactData([])
    const responce = await fetch('https://alphacode.onrender.com/admin/contact', {
      method: 'GET',
      headers: {
        Authorization: Admintoken
      }
    })
       if (responce.ok) {
        const data = await responce.json()
        setcontactData(data)
        
          
       }
       else{
       let data =  await responce.json()
        seterrMessage(data.message)
        
          
       }

    setLoader(false)

  }
 
  console.log(contactData);
  

  const deleteContact = async(id) =>{
    const Contactres = await fetch(`https://alphacode.onrender.com/admin/contact/delete/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: Admintoken
      }
    })
    
    if (Contactres.ok) {
        let data = await Contactres.json();
        contactdata()
        toast.success(data.message);

    }
  
    else{
      toast.error("contact is not deleted")
    }
   
  }

  useEffect(() => {
    contactdata()
   

  }, [])



  return (
    <>

      <table style={{ display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center",marginTop:"80px", borderCollapse: "collapse" }}>
        <tbody style={{ backgroundColor: 'white', height: "400px", borderRadius: "10px",overflow:"auto"  }}>

          <tr style={{ height: "50px", textAlign: "center" }}>
            <th style={{ width: "157px", borderBottom: "2px solid blue", borderCollapse: "collapse" }}>Name</th>
            <th style={{ width: "157px", borderBottom: "2px solid blue", borderCollapse: "collapse" }}>Email</th>
            <th style={{ width: "157px", borderBottom: "2px solid blue", borderCollapse: "collapse" }}>Message</th>
            <th style={{ width: "157px", borderBottom: "2px solid blue", borderCollapse: "collapse" }}>Delete</th>

          </tr>




          {
            loader ? <h4>Loading...</h4>:contactData.length === 0 ? <h4>{errMessage}</h4>: contactData.map((conData, index) => {

              return <><tr key={index} style={{ height: "54px" }}>
                <td style={{ width: "157px" }}>{conData.username}</td>
                <td style={{ width: "157px" }}>{conData.email}</td>
                <td style={{ width: "300px" }}>{conData.message}</td>
                <td style={{ width: "157px" }}><button style={{ width: "80px", height: "30px",border:"none", borderRadius: "30px", backgroundColor: "#2bcd2b", fontSize: "15px", cursor: "pointer", fontWeight: "500", color: "white" }} onClick={()=>{deleteContact(conData._id)}}>Delete</button></td>
              </tr>
             
              </>
            })
          }

        </tbody>
      </table>


    </>
  )
}

export default Admincontact
