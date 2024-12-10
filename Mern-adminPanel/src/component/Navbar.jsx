import { Navigate, NavLink, redirect, useNavigate } from "react-router-dom"
import css from './Navbar.module.css'
import { useAuth } from "../store/auth"
const Navbar = () => {
 

    const {isloggedIn,isAdmin} = useAuth();

    
    return <>

          <header>
            <div className={css.container}>
                <div className={css.logo}>
                    <NavLink to="/">Alphacode</NavLink>
                </div>

                <nav className={css.navbar}>
                    <ul>
                        {isloggedIn
                        ?(<><li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/about">About</NavLink></li>
                        <li><NavLink to="/contact">Contact</NavLink></li>
                        <li><NavLink to="/service">Services</NavLink></li>
                        <li><NavLink to="/logout">Logout</NavLink></li>
                        </>)
                        : (
                            <>
                            <li><NavLink to="/register">Signup</NavLink></li>
                            <li><NavLink to="/login">Login</NavLink></li>
                            </>
                            )}
                        
                        {isAdmin?
                         <li><NavLink to="/admin">Admin</NavLink></li>
                        :''}
                        
                        
                        
                    
                        
                        
                    </ul>
                </nav>
            </div>
          </header>

    </>
}

export default Navbar