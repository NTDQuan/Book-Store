import React, { useContext } from 'react'
import { ProductContext } from '../../../hooks/ProductContext'
import ProductItem from '../../../components/UserWeb/Product_Item/Product_Item'
import default_image from '../../../assets/no_book_cover.jpg'
import './CustomerBookListPage.css'

const CustomerBookListPage = () => {
    const { all_product } = useContext(ProductContext)
    const defaultImage = default_image;

    return (
        <div className='book-list-page'>
            <div className='products'>
                {all_product.map((item, i)=> {
                    const image = item.book_cover || defaultImage;
                    return (
                        <ProductItem key={i} id={item.id} title={item.title} author={item.author} image={image} price={item.price}  />
                    )
                })}
            </div>
        </div>
    )
}

export default CustomerBookListPage
