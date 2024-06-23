import React, { useState, useEffect } from 'react';
import { getCart, removeFromCart, updateCartItemQuantity } from '../../../service/CartService.js';
import { useNavigate } from 'react-router-dom';
import { getBooksDataByID } from '../../../service/BookService.js';
import './Cart.css';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [needsReload, setNeedsReload] = useState(false);
    const navigate = useNavigate();

    const fetchUserCart = async () => {
        setIsLoading(true);
        try {
            const cartData = await getCart();
            setTotalPrice(cartData.totalPrice);

            const updatedCartItems = await Promise.all(
                cartData.cartItems.map(async (item) => {
                    try {
                        const bookDetails = await getBooksDataByID(item.bookId);
                        return {
                            ...item,
                            book: {
                                id: bookDetails.id,
                                title: bookDetails.title,
                                price: bookDetails.price
                            }
                        };
                    } catch (error) {
                        console.error('Error fetching book details:', error);
                        return item; // Return item as is if book details fetching fails
                    }
                })
            );

            setCartItems(updatedCartItems);
        } catch (error) {
            console.error('Error fetching user cart:', error);
        } finally {
            setIsLoading(false); // Set loading to false once data is fetched (success or failure)
        }
    };

    useEffect(() => {
        fetchUserCart();
    }, []);

    useEffect(() => {
        if (needsReload) {
            fetchUserCart().then(() => setNeedsReload(false));
        }
    }, [needsReload]);

    const handleRemoveItem = async (cartItemId) => {
        try {
            await removeFromCart(cartItemId);
            setNeedsReload(true);
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };

    const handleUpdateQuantity = async (cartItemId, quantity) => {
        try {
            await updateCartItemQuantity(cartItemId, quantity);
            setNeedsReload(true);
        } catch (error) {
            console.error('Error updating cart item quantity:', error);
        }
    };

    const handlePlaceOrder = () => {
        navigate('/create-order', { state: { totalPrice } });
    };

    return (
        <div className='cart'>
            <div className='cart-content'>
                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    <>
                        <div className='cart-content-info'>
                            {cartItems.map((item) => (
                                <div className='cart-item' key={item.bookId}>
                                    <div className='cart-item-left'>
                                        <p className='cart-item-title'>{item.book.title}</p>
                                        <a className='cart-item-remove' onClick={() => handleRemoveItem(item.bookId)}>Remove</a>
                                    </div>
                                    <div className='cart-item-right'>
                                        <p>{item.book.price}</p>
                                        <input type='number' value={item.quantity} onChange={(e) => handleUpdateQuantity(item.bookId, e.target.value)} />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <hr className='cart-divider'></hr>
                        <div className='cart-content-info'>
                            <div className='total'>
                                <p className='total-title'>Total Price</p>
                                <p className='total-price'>{totalPrice}</p>
                            </div>
                            <button onClick={handlePlaceOrder}>Place order</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Cart;