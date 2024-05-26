import React, { useState, useEffect} from 'react'
import DataTable from '../../../components/AdminPanel/DataTable/DataTable.jsx'
import no_image from '../../../assets/no_book_cover.jpg'
import './Book.css'
import { getBooksData } from '../../../service/FetchBookData.js'

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
      field: 'book_cover',
      headerName: 'Book cover',
      width: 150,
      renderCell: (params) => {
          return (
              <img src={params.row.img || no_image} alt=''/>
          )
      }
  },
  {
    field: 'title',
    headerName: 'Title',
    width: 500,
    editable: false,
  },
  {
    field: 'author',
    headerName: 'Author',
    width: 200,
    editable: false,
  },
  {
    field: 'category',
    headerName: 'Category',
    width: 200,
    editable: false,
  },
  {
    field: 'stock',
    headerName: 'Stock',
    type: Number,
    width: 160,
    editable: false
  }
];

const rows = [
  { id: 1, title: 'Konosuba', author: 'Kwan', category: 'comedy', stock: 100},
];


const Book = () => {
  const [bookdata, setBooks] = useState([])
  const getBooks = async() => {
    try{
      const data = await getBooksData();
      setBooks(data);
      console.log(data)
    } catch (error) {
      console.error('Error fetching data', error)
    }   
  };

  useEffect(() => {
    getBooks()
  }, [])


  return (
    <div className='books'>
      <div className='info'>
        <h1>Books</h1>
        <button>Add New Book</button>
      </div>
      <DataTable slug="books" columns={columns} rows={bookdata}/>
    </div>
  )
}

export default Book
