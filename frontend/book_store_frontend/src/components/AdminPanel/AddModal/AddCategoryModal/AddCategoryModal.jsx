import React from 'react'
import './AddCategoryModal.css'

const AddCategoryModal = (props) => {
    const { slug, columns, setOpen } = props;

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        //Convert form to json
        const formObject = {};
        formData.forEach((value, key) => {
          formObject[key] = value;
        });
        const json = JSON.stringify(formObject);
        console.log(json);  
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
