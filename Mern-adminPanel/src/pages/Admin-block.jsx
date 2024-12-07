
import React, { useEffect, useState } from 'react'
import { useAuth } from '../store/auth';
import {toast} from 'react-toastify';

function Adminblock() {
    const { Admintoken ,modified} = useAuth()
  const [blockData,setBlockData]  = useState([])
  const [loader,setLoader]  = useState(true)
  const [errMessage,SetErrMessage]  = useState()
   modified()
        const Blockedata = async() =>{
            setLoader(true)
            const data = await fetch('https://alphacode.onrender.com/admin/user/block/data' , {
                method:'GET',
                headers:{
                    Authorization: Admintoken
                }
            }) 

            if (data.ok) {
                const responce = await data.json();
                setBlockData(responce);
                setLoader(false)
            }
            else{
                const responce = await data.json();
                setBlockData([])
                SetErrMessage(responce.message)
                console.log(errMessage);
                setLoader(false)
            }

        }


        const unblockuser = async(id) =>{
              const responce = await fetch(`https://alphacode.onrender.com/admin/user/block/${id}`,{
                method:'DELETE',
                headers:{
                    Authorization: Admintoken
                }
              })

              if (responce.ok) {
                const data = await responce.json()
                   Blockedata()
                   toast.success(data.message)

              } 

              else{
                toast.error("user is not unblocked")
              }
              Blockedata()
        }

        useEffect(()=>{
            Blockedata()
           
        },[])
  return (
    <table style={{ display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center",marginTop:"80px", borderCollapse: "collapse" }}>
    <tbody style={{ backgroundColor: 'white', height: "400px", borderRadius: "10px",overflow:"auto"  }}>

      <tr style={{ height: "50px", textAlign: "center" }}>
        <th style={{ width: "357px", borderBottom: "2px solid blue", borderCollapse: "collapse" }}>Email</th>
        <th style={{ width: "157px", borderBottom: "2px solid blue", borderCollapse: "collapse" }}>Unblock</th>

      </tr>




      {
        loader ? <h4>Loading...</h4>:blockData.length === 0 ? <h4>{errMessage}</h4>: blockData.map((blockData, index) => {

          return <><tr key={index} style={{ height: "54px" }}>
            <td style={{ width: "157px" }}>{blockData.email}</td>
            <td style={{ width: "157px" }}><button style={{ width: "80px", height: "30px",border:"none", borderRadius: "30px", backgroundColor: "#2bcd2b", fontSize: "15px", cursor: "pointer", fontWeight: "500", color: "white" }} onClick={()=>{unblockuser(blockData._id)}}>Unblock</button></td>
          </tr>
         
          </>
        })
      }

    </tbody>
  </table>
  )
}

export default Adminblock
