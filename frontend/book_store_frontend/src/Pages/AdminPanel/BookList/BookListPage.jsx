import React, { useState, useEffect } from 'react'
import DataTable from '../../../components/AdminPanel/DataTable/DataTable.jsx'
import no_image from '../../../assets/no_book_cover.jpg'
import './BookListPage.css'
import { getBooksData, deleteBook, getBooksDataByID } from '../../../service/BookService.js'
import AddBookModal from '../../../components/AdminPanel/AddModal/AddBookModal/AddBookModal.jsx'
import EditBookModal from '../../../components/AdminPanel/EditModal/EditBookModal/EditBookModal.jsx'

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
    width: 440,
    type: String,
    editable: false,
  },
  {
    field: 'author',
    headerName: 'Author',
    width: 160,
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
  const [bookData, setBooks] = useState([])
  const [open, setOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [selectedBook, setSelectedBook] = useState(null)

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

  const handleDelete = async (id) => {
    try {
      await deleteBook(id);
      refreshBooks();
      alert('Book deleted successfully');
    } catch (error) {
      console.error('Error deleting book', error);
    }
  };

  const handleEdit = async (id) => {
    try {
      setSelectedBook(await getBooksDataByID(id));
      setEditOpen(true);
    } catch (error) {
      console.error('Error fetching book data', error);
    }
  }

  return (
    <div className='books'>
      <div className='info'>
        <h1>Books</h1>
        <button onClick={() => setOpen(true)}>Add New Book</button>
      </div>
      <DataTable slug="books" columns={columns} rows={bookData} handleDelete={handleDelete} handleEdit={handleEdit}/>
      {open && <AddBookModal slug="book" setOpen={setOpen} refreshBooks={refreshBooks}/>}
      {editOpen && <EditBookModal slug="book" setOpen={setEditOpen} refreshBooks={refreshBooks} params={selectedBook}/>}
    </div>
  )
}

export default BookListPage