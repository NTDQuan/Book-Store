import React, { useState, useEffect} from 'react'
import DataTable from '../../../components/AdminPanel/DataTable/DataTable.jsx'
import no_image from '../../../assets/no_book_cover.jpg'
import './BookListPage.css'
import { getBooksData } from '../../../service/BookService.js'
import AddBookModal from '../../../components/AdminPanel/AddModal/AddBookModal/AddBookModal.jsx'

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
    width: 460,
    type: String,
    editable: false,
  },
  {
    field: 'author',
    headerName: 'Author',
    width: 200,
    type: String,
    editable: false,
  },
  {
    field: 'category',
    headerName: 'Category',
    width: 160,
    type: String,
    editable: false,
  },
  {
    field: 'stock',
    headerName: 'Stock',
    type: Number,
    width: 160,
    editable: false
  },
  {
    field: 'price',
    headerName: 'Price',
    type: Number,
    width: 160,
    editable: false
  }
];


const BookListPage = () => {
  const [bookdata, setBooks] = useState([])
  const [open, setOpen] = useState(false)

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

  const refreshBooks = () => {
    getBooks();
  };


  return (
    <div className='books'>
      <div className='info'>
        <h1>Books</h1>
        <button onClick={() => setOpen(true)}>Add New Book</button>
      </div>
      <DataTable slug="books" columns={columns} rows={bookdata}/>
      {open && <AddBookModal slug="book" columns={columns} setOpen={setOpen} refreshBooks={refreshBooks}/> }
    </div>
  )
}

export default BookListPage
