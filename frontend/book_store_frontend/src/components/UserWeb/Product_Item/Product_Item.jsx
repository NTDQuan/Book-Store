import React from 'react'
import './Product_Item.css'
import { Link } from 'react-router-dom'

const Product_Item = (props) => {
  return (
    <div className='product-item'>
        <Link to={`/books/${props.id}`}>
            <div className='img-container'>
                <img src={props.image} alt="" />
            </div>
            <p className='product-item-title'>{props.title}</p>
            <p className='product-item-author'>{props.author}</p>
            <div className='product-item-price'>
                {props.price}
            </div>
        </Link>
    </div>
  )
}

export default Product_Item
