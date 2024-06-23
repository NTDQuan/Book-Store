import React from 'react'
import NavBar from '../../../components/AdminPanel/Navbar/NavBar'
import Menu from '../../../components/AdminPanel/Menu/Menu'
import Footer from '../../../components/AdminPanel/Footer/Footer'
import { Outlet } from 'react-router-dom'
import './Layout.css'


const Layout = () => {
  return (
    <div className='Layout'>
      <NavBar/>
      <div className='container'>
        <div className='menuContainer'>
          <Menu/>
        </div>
        <div className='contentContainer'>
          <Outlet/>
        </div>
      </div>
      <Footer/>
    </div>
  )
}
export default Layout