import React from 'react';
import './AddStaffModal.css';

const AddAuthorModal = (props) => {
    const { slug, setOpen } = props;

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        // Convert form data to JSON
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        const json = JSON.stringify(formObject);
        console.log(json);  
    };

    return (
        <div className="addAuthorModal">
            <div className="modal">
                <span className="close" onClick={() => setOpen(false)}>X</span>
                <h1>Add new {slug}</h1>
                <form onSubmit={handleSubmit}>
                    <div className='item'>
                        <label>Author name</label>
                        <input className='input' name="fullName" type='text' placeholder='full name' required />
                    </div> 
                    <button type="submit">Create</button>
                </form>
            </div>
        </div>
    );
};

export default AddAuthorModal;
