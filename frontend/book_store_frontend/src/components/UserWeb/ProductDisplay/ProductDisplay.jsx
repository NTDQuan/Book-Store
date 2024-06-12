import React from 'react'
import defaultImage from '../../../assets/no_book_cover.jpg'
import { addToCart } from '../../../service/CartService'
import './ProductDisplay.css'
import { useAuth } from '../../../hooks/AuthProvider'

const ProductDisplay = (props) => {
    const { book } = props;
    const image = book.book_cover || defaultImage;
    const { getCurrentCustomer } = useAuth();

    const handleAddToCart = () => {
        const currentCustomer = getCurrentCustomer();
        console.log(currentCustomer)
        addToCart(currentCustomer.id, book.id, 1, currentCustomer.token)
            .then(response => {
                console.log('Item added to cart:', response.data);
            })
            .catch(error => {
                console.error('Error adding item to cart:', error);
            });
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
                <div className='product-display-right-buy-button'>
                    <button>BUY</button>
                </div>
                <div className='product-display-right-add-cart-button'>
                    <button onClick={handleAddToCart}>ADD TO CART</button>
                </div>
            </div>
        </div>
    )
}

export default ProductDisplay
