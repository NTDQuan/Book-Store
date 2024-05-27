import React, { useState, useRef } from 'react'
import './AddBookModal.css'

const AddBookModal = (props) => {
  const { slug, columns, setOpen } = props;
  const [file, setFile] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    //Convert form to json
    const formObject = {};
    formData.forEach((value, key) => {
      formObject[key] = value;
    });

    // TODO: add firebase to store images
    if (file) {
      
    }

    const json = JSON.stringify(formObject);
    console.log(json);

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
            </select>
          </div>
          <div className='item'>
            <label>{'Category'}</label>
            <select className='input' name='category' required>
              <option value="">--Select author--</option>
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
          <button>Create</button>
        </form>
      </div>
    </div>
  )
}

export default AddBookModal
