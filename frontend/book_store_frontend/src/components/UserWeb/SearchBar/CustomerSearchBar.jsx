import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { getBooksData } from '../../../service/BookService.js';
import './CustomerSearchBar.css'

const CustomerSearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getBooksData()
      .then(data => setBooks(data))
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredBooks([]);
    } else {
      setFilteredBooks(
        books.filter(book => 
          book.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, books]);

  const handleSelectBook = (bookId) => {
    navigate(`/books/${bookId}`);
  };

  return (
    <div className='customer-search-bar'>
      <div className='input-wrapper'>
        <input 
          type='text'
          placeholder='Type to search...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {filteredBooks.length > 0 && (
          <ul className='dropdown'>
            {filteredBooks.map(book => (
              <li 
                key={book.id} 
                onClick={() => handleSelectBook(book.id)}
              >
                {book.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default CustomerSearchBar
