import React, { createContext, useEffect, useState } from 'react';
import { getBooksData } from '../service/BookService.js';

export const ProductContext = createContext(null);

const ProductContextProvider = (props) => {
    const [all_product, setAllProduct] = useState([]);
    const getBooks = async() => {
        try{
          const data = await getBooksData();
          setAllProduct(data);
          console.log(data)
        } catch (error) {
          console.error('Error fetching data', error)
        }   
      };
    
      useEffect(() => {
        getBooks()
      }, [])
    

    console.log(all_product)
    const contextValue = { all_product };

    return (
        <div>
            <ProductContext.Provider value={contextValue}>
                {props.children}
            </ProductContext.Provider>
        </div>
    )
}

export default ProductContextProvider;
