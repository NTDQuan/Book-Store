import React from 'react'
import defaultImage from '../../../assets/no_book_cover.jpg'
import './ProductDisplay.css'
import { useAuth } from '../../../hooks/AuthProvider'
import { addToCart } from '../../../service/CartService';

const ProductDisplay = (props) => {
    const { book } = props;
    const image = book.book_cover || defaultImage;
    const { getCurrentCustomer } = useAuth();

    const handleAddToCart = async () => {
        try {
            const response = await addToCart(book.id, 1); // Adding one quantity
            alert('Product added to cart successfully');
            console.log(response); // Handle the response accordingly
        } catch (error) {
            console.error('Error adding to cart:', error);
            alert('Failed to add product to cart');
        }
    };

    return (
        <div className='product-display'>
            <div className='product-display-left'>
                <div className='product-display-left-cover'>
                    <img src={image} alt=''/>
                </div>
            </div>
            <div className='product-display-right'>
                <div className='product-display-right-title'>
                    {book.title}
                </div>
                <div className='product-display-right-author'>
                    {book.author}
                </div>
                <div className='product-display-right-category'>
                    Category: {book.category}
                </div>
                <div className='product-display-right-description'>
                    {book.description}
                </div>
                <div className='product-display-right-stock'>
                    Stock: {book.stock}
                </div>
                <div className='product-display-right-price'>
                    {book.price} VNĐ
                </div>
                <div className='product-display-right-add-cart-button'>
                    <button onClick={handleAddToCart}>ADD TO CART</button>
                </div>
            </div>
        </div>
    )
}

export default ProductDisplay
