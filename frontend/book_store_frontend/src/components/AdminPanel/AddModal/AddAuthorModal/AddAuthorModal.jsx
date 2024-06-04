import React from 'react'
import './AddAuthorModal.css'
import { addAuthor } from '../../../../service/AuthorService'

const AddAuthorModal = (props) => {
    const { slug, setOpen, refreshAuthors } = props;

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        //Convert form to json
        const formObject = {};
        formData.forEach((value, key) => {
          formObject[key] = value;
        });

        const jsonData = {
            fullName: formObject.fullName 
        }; 

        try {
            console.log(formData.fullName)
            const response = await addAuthor(jsonData);
            // Handle success (e.g., close modal, show success message, etc.)
            setOpen(false);
            refreshAuthors();
            alert('Book added successfully')
        } catch (error) {
            console.error('Error:', error);
            // Handle error (e.g., show error message, etc.)
        }
      }

    return (
        <div className="addAuthorModal">
            <div className="modal">
                <span className="close" onClick={() => setOpen(false)}>X</span>
                <h1>Add new {slug}</h1>
                <form onSubmit={handleSubmit}>
                <div className='item'>
                    <label>{'Author name'}</label>
                    <input className='input' name="fullName" type='text' placeholder={'full name'} required />
                </div> 
                <button>Create</button>
                </form>
            </div>
        </div>
    )
}

export default AddAuthorModal
