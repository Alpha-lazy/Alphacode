

import React from 'react'
import styles from "./notFound.module.css";
import { Navigate, useNavigate } from 'react-router-dom';


function notFound() {
  const navigate = useNavigate()
  const home =() =>{
   navigate('/')
     
     
  }
  return (
    
    <div>
        <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.message}>Oops! The page you're looking for doesn't exist.</p>
      <button className={styles.button} onClick={home}>
        Go to Homepage
      </button>
    </div>
       
    </div>
  )
}

export default notFound
