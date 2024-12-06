import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Register from './pages/Register'
import Login from './pages/Login'
import Service from './pages/Service'
import Navbar from './component/Navbar'
import  NotFound from './pages/notFound'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Logout from './pages/Logout'
import Adminlayout from './layout/Admin-layout'
import AdminUser from './pages/Admin-User'
import Admincontact from './pages/Admin-contact'
import Useredit from './pages/User-edit'
import Footer from './component/footer'
import Adminblock from './pages/Admin-block'

function App() {
  
        
  return (
    <>
        <Router>
              <Navbar/>
              
          <Routes>
            <Route  path='/' element ={<Home/>} />
            <Route  path='/about' element ={<About/>} />
            <Route  path='/contact' element ={<Contact/>} />
            <Route  path='/service' element={<Service/>}/>
            <Route  path='/login' element ={<Login/>} />
            <Route  path='/register' element ={<Register/>} />
            <Route path='/logout' element={<Logout/>}/>
            <Route path='*' element={<NotFound/>}/>

            <Route path='/admin' element={<Adminlayout/>}>
                   <Route path='user' element={<AdminUser/>}/>
                   <Route path='contacts' element={<Admincontact/>}/>
                   <Route path='edit' element={<Useredit/>}/>
                   <Route path='block' element={<Adminblock/>}/>
            </Route>
            
          </Routes>
            <Footer/>
        </Router> 
      
    </>
  )
}

export default App
