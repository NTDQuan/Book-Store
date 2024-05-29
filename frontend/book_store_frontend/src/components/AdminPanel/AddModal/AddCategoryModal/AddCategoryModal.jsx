import React from 'react'
import './AddCategoryModal.css'
import { addCategory } from '../../../../service/CategoryService.js'

const AddCategoryModal = (props) => {
    const { slug, setOpen, refreshCategories } = props;

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        //Convert form to json
        const formObject = {};
        formData.forEach((value, key) => {
          formObject[key] = value;
        });
        const jsonData = {
            name: formObject.name 
        }; 
        try {
            console.log(formData.fullName)
            const response = await addCategory(jsonData);
            // Handle success (e.g., close modal, show success message, etc.)
            setOpen(false);
            refreshCategories();
            alert('Category added successfully')
        } catch (error) {
            console.error('Error:', error);
            // Handle error (e.g., show error message, etc.)
        } 
      }

    return (
        <div className="addCategoryModal">
            <div className="modal">
                <span className="close" onClick={() => setOpen(false)}>X</span>
                <h1>Add new {slug}</h1>
                <form onSubmit={handleSubmit}>
                <div className='item'>
                    <label>{'Category name'}</label>
                    <input className='input' name="name" type='text' placeholder={'category title'} required />
                </div> 
                <button>Create</button>
                </form>
            </div>
        </div>
    )
}

export default AddCategoryModal
