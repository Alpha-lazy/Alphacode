
import css from "./Service.module.css"
import image from '../image/Service.png'
import { useEffect, useState } from "react"
import spiner from '../image/loader.gif'

const Service = () => {
    const [data, setData] = useState([]);
    const [loader,setLoader] = useState(true)
    useEffect(() => {
        setLoader(true)
        const fetchdata = async () => {
            const responce = await fetch('http://localhost:5000/api/data/service', {
                method: "GET"
            });
            const res_data = await responce.json();
            setData(res_data.message)
            setLoader(false)

           
        }
        fetchdata()
       

    }, [])

    

    return <>
        <h1 style={{ color: "white", marginLeft: "30px", textDecoration: "underline rgb(59, 70, 216)" }}>Services</h1>
        <div className={css.container}>
      

            { loader? <img src={spiner} width="100px" height="100px" alt="" />
               :
                data.map((resData, index) => {

                    return <div key={index} className={css.cardContainer}>
                        <div>
                            <img className={css.cardImage} src={image} alt="" />
                        </div>
                        <div className={css.info}>
                            <div>{resData.provides}</div>
                            <div>{resData.price}</div>
                        </div>
                        <div className={css.service}>
                            <h2 style={{ color: "white" }}>{resData.service}</h2>
                        </div>

                        <div className={css.desc}>
                            <p style={{ color: "rgb(213 213 213)", fontSize: '14px' }}>
                                {resData.description}
                            </p>
                        </div>
                    </div>
                })}


                  
        </div>

    </>
}

export default Service