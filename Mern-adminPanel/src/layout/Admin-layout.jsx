import React from 'react'
import { Navigate, NavLink, Outlet } from 'react-router-dom'
import { FaUser,FaHome } from "react-icons/fa";
import { MdListAlt } from "react-icons/md";
import { FaMessage } from "react-icons/fa6";
import { useAuth } from '../store/auth';
import css from '../component/Navbar.module.css'
import image from '../image/Admin.png'

function Adminlayout() {
    const {isAdmin} = useAuth()

    if (!isAdmin) {
        return  <Navigate to="/"/> 
    }
    return (
        <>


            <header style={{height:"100vh",position:'absolute'}}>
                <nav className={css.navbar} style={{position:"absolute"}} >
                    <ul style={{display:"flex" , flexFlow:"column", gap:"78px",marginTop:"70px", padding:'16px'}}>
                        <li>
                        <NavLink to="/admin/user"><FaUser style={{marginRight:"5px"}}/>Users</NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/contacts"><FaMessage style={{marginRight:"5px"}}/>Contacts</NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/block"><MdListAlt style={{marginRight:"5px"}}/>Blocked</NavLink>
                        </li>
                        <li>
                            <NavLink to="/"><FaHome style={{marginRight:"5px",height:"20px",width:"20px"}}/>Home</NavLink>
                        </li>
                    </ul>
                </nav>
            </header>

           

            <Outlet/>

        </>
    )
}

export default Adminlayout
