import React from 'react'
import mainImage from '../../../assets/main_page.jpg'
import './MainPage.css'

const MainPage = () => {
  return (
    <div className='MainPage'>
      <div className='main-container'>
        <div className='image-wrapper'>
          <img src={mainImage} alt="Main" />
          <h1 className='image-title'>Welcome to Our Book Shelf</h1>
        </div>
      </div>
    </div>
  );
}

export default MainPage
