import React, { useContext} from 'react'
import { useParams } from 'react-router-dom'
import { ProductContext } from '../../../hooks/ProductContext'
import ProductDisplay from '../../../components/UserWeb/ProductDisplay/ProductDisplay'

const Product_Detail = () => {
    const { all_product } = useContext(ProductContext)
    const { bookID } = useParams();
    const book = all_product.find((e)=> e.id === Number(bookID));
    return (
        <div>
            <div className='product-detail'>
                <div className='product-detail-maincontent'>
                    <ProductDisplay book={book}/>
                </div>
            </div>
        </div>
    )
}

export default Product_Detail
