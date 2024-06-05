import React from 'react'
import { Link } from 'react-router-dom'
import {Navbar} from './data.js'
import 'Navbar.css'
const Navbar = () => {
    return (
      <div className='Navbar'>
        {Navbar.map((item) => (
          <nav class="navbar">
          <ul>
                    <li><a href="">Home</a></li>
                    <li><a href="">About</a></li>
                    <li><a href="">BookList</a></li>
                    <li><a href="">Products</a></li>
                    <li><a href="">Contact</a></li>
            </ul>
           </nav>
        ))}
      </div>
    )
  }
  
  export default Navbar