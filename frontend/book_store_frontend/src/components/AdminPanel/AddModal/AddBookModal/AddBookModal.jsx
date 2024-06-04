import React, { useState, useEffect } from 'react'
import { getCategoriesData } from '../../../../service/CategoryService'
import { getAuthorsData } from '../../../../service/AuthorService'
import { addBook } from '../../../../service/BookService'
import './AddBookModal.css'

const AddBookModal = (props) => {
  const { slug, setOpen, refreshBooks } = props;
  const [file, setFile] = useState();
  const [categories, setCategories] = useState([]);
  const [authors, setauthors] = useState([]) 
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCategoriesData().then(data => setCategories(data))
    getAuthorsData().then(data => setauthors(data))
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.target);

    //Convert form to json
    const formObject = {};
    formData.forEach((value, key) => {
      formObject[key] = value;
    });

    // TODO: add firebase to store images
    if (file) {
      
    }

    const jsonData = {
      title: formObject.title,
      author: { id: parseInt(formObject.author) },
      category: { id: parseInt(formObject.category) },
      book_cover: file ? file.name : null,
      stock: parseInt(formObject.stock),
      description: formObject.description || "No description provided",
      price: parseInt(formObject.price),
    };

    try {
      const response = await addBook(jsonData);
      setLoading(false);
      // Handle success (e.g., close modal, show success message, etc.)
      setOpen(false);
      refreshBooks();
      alert('Book added successfully')
    } catch (error) {
      console.error('Error:', error);
      // Handle error (e.g., show error message, etc.)
    }
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile.name.match(/\.(jpg|jpeg|png|gif)$/i)) {
      alert('Not an image')
      e.target.value = null;
    } else {
      setFile(selectedFile);
    }
  };

  return (
    <div className="addBookModal">
      <div className="modal">
        <span className="close" onClick={() => setOpen(false)}>X</span>
        <h1>Add new {slug}</h1>
        <form onSubmit={handleSubmit}>
          <div className='item'>
            <label>{'Title'}</label>
            <input className='input' name="title" type='text' placeholder={'title'} required />
          </div>
          <div className='item'>
            <label>{'Stock'}</label>
            <input className='input' name="stock" type='number' placeholder={'stock'} required />
          </div>   
          <div className='item'>
            <label>{'Author'}</label>
            <select className='input' name='author' required>
              <option value="">--Select author--</option>
              {authors.map(author => (
                <option key={author.id} value={author.id}>{author.fullName}</option>
              ))}
            </select>
          </div>
          <div className='item'>
            <label>{'Category'}</label>
            <select className='input' name='category' required>
              <option value="">--Select category--</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
          <div className='item'>
            <label>{'Price'}</label>
            <input className='input' name='price' type='number' placeholder={'price'} required />
          </div>  
          <div className='item'>
            <label>Description</label>
            <textarea className='input_textarea' name='description' rows="4" placeholder="Description"></textarea>
          </div>
          <div className='item'>
            <label>{'Cover image'}</label>
            <input className='input' type="file" name='cover_image' onChange={handleFileChange}/>
          </div>  
          <button disabled={loading}>
            {loading ? 'Loading...' : 'Create'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddBookModal
