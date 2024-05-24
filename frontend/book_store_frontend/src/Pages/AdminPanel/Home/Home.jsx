import './Home.css'

import React from 'react'
import NavBar from '../../../components/AdminPanel/Navbar/NavBar'
import Menu from '../../../components/AdminPanel/Menu/Menu'
import Footer from '../../../components/AdminPanel/Footer/Footer'
import { Outlet } from 'react-router-dom'


const Home = () => {
  return (
    <div className='Home'>
      <h1>Home</h1>
    </div>
  )
}

export default Home
